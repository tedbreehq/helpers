import { computed } from "@vue/composition-api";

export const useNavigation = (routes) => {

    const isNavActive = (route) => window.location.href.endsWith(route); //TODO: Implement Nested Route Checking

    const navigation = computed(() =>
        routes.hasOwnProperty('primary')
            ? prepareRoutes(routes.primary)
            : prepareRoutes(routes)
    );

    const alternateNavigation = computed(() =>
        routes.hasOwnProperty('alternate')
            ? prepareRoutes(routes.alternate)
            : []
    );

    const prepareRoutes = (routes) => routes.map(route => {
        route.active = isNavActive(route.href)
        return route;
    });

    return  { isNavActive, navigation, alternateNavigation };
}
