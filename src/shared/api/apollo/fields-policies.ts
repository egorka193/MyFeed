import type { FieldPolicy } from "@apollo/client/cache";
import unionBy from "lodash.unionby";

interface EntityRef {
  __ref?: string;
  id?: string;
  [key: string]: unknown;
}

type KeyArgs = FieldPolicy<EntityRef>["keyArgs"];

export const cursorPagination =
  (keyArgs: KeyArgs = false): FieldPolicy => ({
    keyArgs,
    merge(existing, incoming, { args }) {
      const incomingData = incoming?.data ?? [];
      const existingData = existing?.data ?? [];

      const hasAfterCursor = Boolean(args?.input?.afterCursor);

      if (!hasAfterCursor) {
        return incoming;
      }

      if (incomingData.length === 0) {
        return {
          ...existing,
          pageInfo: incoming.pageInfo,
        };
      }

      return {
        ...incoming,
        data: unionBy([...existingData, ...incomingData], (item) => item.__ref || item.id),
      };
    },
  });
