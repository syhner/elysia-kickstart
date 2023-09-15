import type { S } from 'ts-toolbelt';
import type { App } from '~/app';

declare global {
  namespace JSX {
    interface HtmlTag {
      // AJAX
      'hx-get'?: ExtractRoutes<'get'>;
      'hx-post'?: ExtractRoutes<'post'>;
      'hx-put'?: ExtractRoutes<'put'>;
      'hx-patch'?: ExtractRoutes<'patch'>;
      'hx-delete'?: ExtractRoutes<'delete'>;
      // Core
      'hx-boost'?: string;
      'hx-push-url'?: string;
      'hx-select'?: string;
      'hx-select-oob'?: string;
      'hx-swap'?: string;
      'hx-swap-oob'?: string;
      'hx-target'?: string;
      'hx-trigger'?: string;
      'hx-vals'?: string;
      // Additional
      'hx-confirm'?: string;
      'hx-disable'?: boolean;
      'hx-disinherit'?: string;
      'hx-encoding'?: string;
      'hx-ext'?: string;
      'hx-headers'?: string;
      'hx-history'?: 'false';
      'hx-history-elt'?: boolean;
      'hx-include'?: string;
      'hx-indicator'?: string;
      'hx-params'?: string;
      'hx-preserve'?: boolean;
      'hx-prompt'?: string;
      'hx-replace-url'?: string;
      'hx-request'?: string;
      'sse-connect'?: string;
      'sse-swap'?: string;
      'hx-sync'?: string;
      'hx-validate'?: boolean;
      'hx-vars'?: string;
      'ws-connect'?: string;
      'ws-send'?: string;
    }
  }
}

type AppMetaSchema = App['meta']['schema'];

// '/todos/' -> '/todos'
type RouteWithoutTrailingSlash<T extends string> = T extends `${infer U}/`
  ? U
  : T;

// '/todos/:id' -> `/todos/${string}
type RouteLiteral<
  TRoute extends string,
  TRouteArray extends string[] = S.Split<
    RouteWithoutTrailingSlash<TRoute>,
    '/'
  >,
> = S.Join<
  {
    [K in keyof TRouteArray]: TRouteArray[K] extends `:${string}` | '*'
      ? string
      : TRouteArray[K];
  },
  '/'
>;

// { '/todos/:id': schema } -> { '/todos/:id': [ '/todos/${string}', schema ]}
type RouteLiterals<T extends Record<string, object>> = {
  [K in keyof T]: K extends string ? [RouteLiteral<K>, T[K]] : never;
};

// [ `/todos/${string}` ]
type RouteLiteralsWithMethod<
  T extends Record<string, object>,
  U extends string,
> = {
  [K in keyof T]: T[K] extends [unknown, Record<U, unknown>] ? T[K][0] : never;
}[keyof T];

// [ `/todos/${string}` ]
type ExtractRoutes<Method extends string> = RouteLiteralsWithMethod<
  RouteLiterals<AppMetaSchema>,
  Method
>;
