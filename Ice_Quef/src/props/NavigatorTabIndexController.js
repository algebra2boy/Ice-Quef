var navigatorTabIndex = 0;

const resetNavigatorTabIndex = () => {
  navigatorTabIndex = 0;
}

const setNavigatorTabIndex = (newIndex) => {
  navigatorTabIndex = newIndex;
}

const getNavigatorTabIndex = () => navigatorTabIndex;

export { resetNavigatorTabIndex, 
          setNavigatorTabIndex, 
          getNavigatorTabIndex};
