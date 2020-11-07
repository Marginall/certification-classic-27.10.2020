import $ from 'js#/lib/jquery';
import goodsData from 'js#/data/goods';
import {getElement} from './get-element';

export const filter = () => {
	const $filterForm = $('#filter');
	const $controls = $(document).find('input, select');
    const currentPage = $filterForm.data('page');

	getElement(goodsData);

	const createGetParams = (data) => {
		const url = new URL(window.location.href);
		let tempData = {};
		url.search = '';

		if (data.params && data.pagination) {
			tempData = Object.assign(tempData, data.params, data.pagination);

			url.searchParams.set('page', tempData.page);

			if (tempData.year !== '') {
				url.searchParams.set('year', tempData.year);
			}

			url.searchParams.set('price', tempData.price[0] + ',' + tempData.price[1]);

			if (tempData.model !== '') {
				url.searchParams.set('model', tempData.model);
			}

			if (tempData.manufacturer !== '') {
				url.searchParams.set('manufacturer', tempData.manufacturer);
			}

			if (tempData.brand !== '') {
				url.searchParams.set('brand', tempData.brand);
			}

			url.searchParams.set('sort', tempData.sort);
			url.searchParams.set('per-page', tempData.perPage);
		}

		window.history.pushState(null, null, url.href);
	};

	const makeProductFilter = (params, goodsData) => {
		let tempData = {};
		let newGoodsData = goodsData;
        let filterParams = Object.entries(Object.assign(tempData, params.params, params.pagination));
        let result = [];

        newGoodsData.filter((item) => {
            filterParams.forEach((i , param) => {
                if (param[0] === 'manufacturer') {
                    if (param[1] !== item.manufacturer.name) {
                        return false;
                    }
                }
            });
        });
        getElement(result);
	};

	$controls.on('change', () => {
		const brands = [];
		const data = {
			params: {
				brand: [],
				manufacturer: '',
				model: '',
				year: '',
				price: []
			},
			pagination: {
				sort: '',
				perPage: '',
				page: currentPage
			}
        };

		$controls.each((i, el) => {
			const $el = $(el);
			let val = $el.val();
			let brand, manufacturer, model, year, minPrice, maxPrice, sort, perPage;

			switch ($el.attr('name')) {
				case 'marka':
					manufacturer = $el.find('option:selected').text();
					if (manufacturer && !isNaN(val)) {
						data.params.manufacturer = manufacturer;
					}
					break;
				case 'model':
					model = $el.find('option:selected').text();
					if (model && !isNaN(val)) {
						data.params.model = model;
					}
					break;
				case 'year':
					year = parseInt($el.val());
					if (year && !isNaN(val)) {
						data.params.year = year;
					}
					break;
				case 'price-from':
					minPrice = parseInt($el.val());
					data.params.price.push(minPrice);
					break;
				case 'price-to':
					maxPrice = parseInt($el.val());
					data.params.price.push(maxPrice);
					break;
				case 'sort':
					sort = $el.find('option:selected').text();
					data.pagination.sort = sort;
					break;
				case 'per_page':
					perPage = $el.find('option:selected').text();
					data.pagination.perPage = perPage;
					break;
				case 'brand':
					if ($el.prop('checked')) {
						brand = $el.parent().find('span').text();
						brands.push(brand);
					}
					data.params.brand = brands;
					break;
				default:
			}
		});

		createGetParams(data);
		makeProductFilter(data, goodsData);
		console.log(data);
	});
};
