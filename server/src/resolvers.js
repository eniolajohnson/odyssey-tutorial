const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // Resolver for new method to get a single track by ID,
    // for the track page
    track: (_, {id}, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    }
    },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        };
      }
    },
  },

  Track: {
    author: ({authorId}, _, {dataSources}) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({id}, _, {dataSources}) => {
      return dataSources.trackAPI.getTrackModules(id);
    }
  }
};

// // EXAMPLE ONLY - should we add the getTrackModules call here in the track resolver?
// track: async (_, {id}, {dataSources}) => {
//   // get track details
//   const track = dataSources.trackAPI.getTrack(id);
//   // get module details for the track
//   const modules = await dataSources.trackAPI.getTrackModules(id);
//   // shape the data in the way that the schema expects it
//   return {...track, modules};
// };

module.exports = resolvers;

