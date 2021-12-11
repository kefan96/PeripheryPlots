const DEFAULT_state = {
  // Component logical properties (dynamic)
  timeExtentDomain: [new Date("06/22/1997"), new Date("06/22/2020")],
  timeDomains: [
    [new Date("06/22/1997"), new Date("06/22/2000")],
    [new Date("06/23/2000"), new Date("06/22/2010")],
    [new Date("06/23/2010"), new Date("06/22/2013")],
  ],
  proposal: { id: -1 },

  // Component styling properties (static)
  focusColor: "#515151",
  contextColor: "#aaaaaa",

  // Component dimension properties (static)
  numContextsPerSide: 1,
  axesWidth: 100,
  contextWidth: 300,
  trackWidth: 1500,
  controlTimelineHeight: 200,
  baseWidth: 1800,
  trackHeight: 200,
  trackPaddingTop: 20,
  trackPaddingBottom: 20,
  verticalAlignerHeight: 30,
  padding: 15,
};

// Derivation of derived default properties
DEFAULT_state["focusWidth"] = function () {
  let { trackWidth, contextWidth, numContextsPerSide, axesWidth, padding } =
    this;
  let focusWidth =
    trackWidth - contextWidth * 2 * numContextsPerSide - axesWidth - padding;
  return focusWidth;
}.bind(DEFAULT_state)();

const reducer = (state = DEFAULT_state, action) => {
  switch (action.type) {
    case "CHANGE_timeExtentDomain":
      let { timeExtentDomain } = action;
      return {
        ...state,
        timeExtentDomain,
      };
    case "CHANGE_timeDomains":
      let { timeDomains } = action;
      return {
        ...state,
        timeDomains,
      };
    case "CHANGE_numContextsPerSide":
      let { numContextsPerSide } = action;
      return {
        ...state,
        numContextsPerSide,
      };
    case "CHANGE_proposal ":
      let { proposal } = action;
      return {
        ...state,
        proposal,
      };
    default:
      return state;
  }
};

export default reducer;
