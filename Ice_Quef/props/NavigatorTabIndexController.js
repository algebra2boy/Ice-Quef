var navigatorTabIndex = 0;

export const resetNavigatorTabIndex = () => {
    navigatorTabIndex = 0;
}

export const setNavigatorTabIndex = (newIndex) => {
    navigatorTabIndex = newIndex;
}

export const getNavigatorTabIndex = () => navigatorTabIndex;
