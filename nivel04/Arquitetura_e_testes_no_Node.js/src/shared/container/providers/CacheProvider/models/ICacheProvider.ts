interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<unknown>;
  invalidate(key: string): Promise<void>;
}

export default ICacheProvider;
