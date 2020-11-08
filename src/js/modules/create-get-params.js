export const createGetParams = (data) => {
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
