/**
 * Loader state utility enumeration.
 */
export enum LoaderState {
  /**
   * The loader is inactive.
   */
  Idle = 'Idle',
  /**
   * The loader is loading.
   */
  Loading = 'Loading',
  /**
   * The loader is done with loading.
   */
  Done = 'Done',
  /**
   * The loader failed.
   */
  Failed = 'Failed'
}
