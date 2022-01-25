module.exports = { 
  transpileDependencies: [
      'vuetify'
  ],

  // chainWebpack: config => {			
  //     if (process.env.NODE_ENV === 'production') {			
  //         config.module.rule('vue').uses.delete('cache-loader')			
  //         config.module.rule('js').uses.delete('cache-loader')			
  //         config.module.rule('ts').uses.delete('cache-loader')			
  //         config.module.rule('tsx').uses.delete('cache-loader')			
  //     }			
  // },

  css: {
      loaderOptions: {        
          scss: {
            //prependData: '@import "@/assets/styles/styles1.scss"'
            //additionalData: '@import "@/assets/styles/styles.scss";'
            //data: '@import "@/assets/styles/styles.scss";'
          }
      }
  }
}
