var navigatorTabIndex = 0;

// Set navigator index to default (0)
const resetNavigatorTabIndex = () => {
  navigatorTabIndex = 0;
};

// Set navigator index to new value
const setNavigatorTabIndex = newIndex => {
  navigatorTabIndex = newIndex;
};

// Get the current navigator index
const getNavigatorTabIndex = () => navigatorTabIndex;

export { resetNavigatorTabIndex, setNavigatorTabIndex, getNavigatorTabIndex };
