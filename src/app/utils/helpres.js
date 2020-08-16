import localStorage from './localStorage';

import { campaignsData } from './constants';

export const formatData = data => {
	data = data.sort((c1, c2) => {
		return c1.startAt > c2.startAt;
	});

	const upcoming = [];
	const live = [];
	const past = [];

	const today = new Date().valueOf();
	const endDay = new Date().setHours(23, 59, 59, 0);
	const startDay = new Date().setHours(0, 0, 0, 0);

	data.forEach(campaign => {
		if (campaign.startAt <= today && today <= campaign.endAt) {
			live.push(campaign);
		} else if (campaign.startAt > today) {
			upcoming.push(campaign);
		} else {
			past.push(campaign);
		}
	});

	return {
		'upcoming-campaigns': upcoming,
		'live-campaigns': live,
		'past-campaigns': past.reverse(),
	};
};

export const getData = () => {
	let data = localStorage.get('campaigns-list');

	if (data) {
		return formatData(data);
	}

	localStorage.set('campaigns-list', campaignsData);
	return formatData(campaignsData);
};

export const updateData = campaign => {
	let data = localStorage.get('campaigns-list');

	if (!data) {
		return getData();
	}

	data = data.map(item => {
		if (item.id === campaign.id) {
			return campaign;
		}

		return item;
	});

	localStorage.set('campaigns-list', data);

	return formatData(data);
};

const MONTHS = [
	'Jan',
	'Feb',
	'March',
	'April',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const formatDate = date => {
	const d = new Date(date);

	const year = d.getFullYear();
	const month = MONTHS[d.getMonth()];

	const day = d.getDate();

	return `${month} ${year}, ${day}`;
};

export const formatDays = (startAt, endAt) => {
	const d = new Date().valueOf();

	if (startAt <= d && d <= endAt) {
		return 'Live';
	}

	const diff = Math.abs(startAt - d);
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	return d < startAt ? `${days} days ahead` : `${days} days ago`;
};
