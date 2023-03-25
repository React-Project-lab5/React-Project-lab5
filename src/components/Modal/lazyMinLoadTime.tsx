import { ComponentType, lazy } from 'react';

export const lazyMinLoadTime = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  minLoadTimeMs = 5000
) => {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, minLoadTimeMs)),
    ]).then(([moduleExports]) => moduleExports)
  );
};
