declare module '@armonia/tailwind-extra' {
  interface PluginOptions {

  }

  function pluginWithOptions(options?: PluginOptions): () => ({});

  export = pluginWithOptions;
}
