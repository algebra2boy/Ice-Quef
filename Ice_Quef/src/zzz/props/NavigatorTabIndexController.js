// A hack-y way to get the navigator set to index 0 when the app initiates.
// Will be changed to something more sustainable in the future.

var navigatorTabIndex = 0;

const resetNavigatorTabIndex = () => {
  navigatorTabIndex = 0;
};

const setNavigatorTabIndex = newIndex => {
  navigatorTabIndex = newIndex;
};

const getNavigatorTabIndex = () => navigatorTabIndex;

export { resetNavigatorTabIndex, setNavigatorTabIndex, getNavigatorTabIndex };
