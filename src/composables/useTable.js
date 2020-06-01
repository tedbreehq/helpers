import debounce from 'lodash.debounce';
import { reactive, computed } from '@vue/composition-api';

export function useTable(props, context) {
    const state = reactive({
        filters: props.filters !== undefined  ? props.filters : {},
        search: props.search !== undefined  ? props.search : '',
        perPage: props.perPage !== undefined  ? parseInt(props.perPage) : 10,
        page: props.page !== undefined  ? parseInt(props.page) : 1,
        sortField: props.sortField !== undefined  ? props.sortField : 'created_at',
        sortAsc: props.sortAsc !== undefined ? props.sortAsc === 'true' : false,
        field: props.field !== undefined  ? props.field : '',
        tableStats: computed(() => {
            let data = (props.data !== undefined) ? props.data : {
                from: 0,
                to: 0,
                last_page: 0,
                total: 0,
                data: []
            };

            let ts = {
                from: data.from,
                to:  data.to,
                total: data.total
            };

            return {
                data: ts,
                string: `Showing ${ts.from} to ${ts.to} of ${ts.total} results`,
                html: `
                <div>
                    Showing <span>${ts.from}</span> to <span>${ts.to}</span> 
                    of <span>${ts.total}</span> results
                </div>`
            }
        }),

        searchData: computed(() => debounce(e => {
            state.search = e.target.value;
            state.page = 1;
            loadData();
        }, 650)),

        canGoNext: computed(() => {
            let data = (props.data !== undefined) ? props.data : {
                last_page: 0,
            };

            return state.page < data.last_page
        }),

        canGoBack: computed(() => {
            return state.page > 1;
        })
    });

    const sortBy = (field) => {
        state.sortAsc = (state.sortField === field)
            ? (! state.sortAsc) : true;
        state.sortField = field;
        state.page = 1;

        loadData()
    };

    const sortDirection = (direction) => {
        state.sortAsc = (direction === 'asc');

        loadData()
    };

    const filter = (filters) => {
        state.filters = filters;

        loadData();
    };

    const loadData = () => {
        let data = {
            perPage: state.perPage,
            filters: state.filters,
            sortAsc: state.sortAsc,
            sortField: state.sortField,
        };

        if(state.search !== '') {
            data.search = state.search
        }

        if(state.page !== 1) {
            data.page = state.page
        }

        let url = (props.url !== undefined)
            ? props.url
            : window.location.href.split('?')[0];

        getDataFromSource(url);
    };

    const getDataFromSource = (url) => {
        if(context.root.hasOwnProperty('$inertia')) {
            context.root.$inertia.replace(url, {
                method: 'get',
                data,
                preserveState: false,
                preserveScroll: false,
                only: [],
            });
        } else {
            return url;
        }
    }

    const next = () => {
        state.page++;
        loadData();
    };

    const prev = () => {
        state.page--;
        loadData();
    };

    return {
        state,
        prev,
        next,
        filter,
        sortBy,
        sortDirection,
        loadData,
    }
}
