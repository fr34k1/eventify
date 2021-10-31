

export default  function loadedAtPlugin(schema, options) {
    schema.virtual('loadedAt').
      get(function() { return this._loadedAt; }).
      set(function(v) { this._loadedAt = v; });
    
    schema.pre("find",function(next){

        
        next();
    })

    schema.post(['find', 'findOne'], function(docs) {
      if (!Array.isArray(docs)) {
        docs = [docs];
      }
      const now = new Date();
      for (const doc of docs) {
        doc.loadedAt = now;
      }
    });
  };
  