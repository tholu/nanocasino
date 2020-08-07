const axios = require('axios');
const sha256 = require('crypto-js/sha256');

//vars
var seed = process.env.nanoseed;
var maxwininonebet = 100;
var stablebalance = 310;
var betsobject = '';

module.exports = async (req, res) => {
	await game();
	await axios({ method: 'POST', url: 'https://nanopay.besoeasy.com/powcache', headers: { seed: seed, index: 1 } });
	await res.json(betsobject);
};

function betscache(data) {
	var lastblockdetails = data.history[0];

	var walletbalancetemp324 = data.info.balance / 1000000000000000000000000000000;
	var confirmation_height = parseInt(data.info.confirmation_height);
	var temp5464 = data.history;
	var pendingblocks = data.pendingblocks.length;

	var nextbetid = confirmation_height + 1;
	var hashedhash = String(sha256(String(sha256(seed + nextbetid))));

	returndata = [];

	temp5464.forEach((element) => {
		if (element.type === 'receive') {
			var temp2 = element.amount / 1000000000000000000000000000000;
			var temp3 = gamehash(element.height, element.hash);

			var server = String(sha256(seed + element.height));

			newdata = {
				serverhash: server,
				block: element.hash,
				account: element.account,
				amount: temp2.toFixed(8),
				height: element.height,
				betresult: temp3,
			};

			returndata.push(newdata);
		}
	});

	betsobject = {
		nextbethashed: hashedhash,
		pendingblocks: pendingblocks,
		maxwin: walletbalancetemp324 / maxwininonebet,
		lastblockdetails: lastblockdetails,
		bets: returndata,
	};

	return betsobject;
}

function roll(hash) {
	var a1 = parseInt(hash.substring(0, 2), 16) / Math.pow(256, 1);
	var a2 = parseInt(hash.substring(2, 4), 16) / Math.pow(256, 2);
	var a3 = parseInt(hash.substring(4, 6), 16) / Math.pow(256, 3);
	var a4 = parseInt(hash.substring(6, 8), 16) / Math.pow(256, 4);
	var a5 = parseInt(hash.substring(8, 10), 16) / Math.pow(256, 5);
	var float = a1 + a2 + a3 + a4 + a5;
	var float2 = Math.floor(float * 30);
	return float2;
}

function gamehash(inputdata1, inputdata2) {
	var gameevent = [1.1, 0, 1.2, 0, 2, 0, 1.3, 0, 2, 0, 2, 0, 1.4, 0, 3, 0, 1.5, 0, 2, 0, 1.6, 0, 1.7, 0, 4, 0, 1.1, 0, 1.2, 0];

	var server = String(sha256(seed + inputdata1));
	var hash = String(sha256(server + inputdata2));

	var pick = roll(hash);
	return gameevent[pick];
}

async function game() {
	await axios({
		method: 'GET',
		url: 'https://nanopay.besoeasy.com/nanoinfo/nano_3g1q1ocykdd8q4kwwxozjmo89gg8db4ae81s1or13tsknfnrba8ra931dgqn',
	}).then(async function (response) {
		//cache
		betscache(response.data);

		var walletbalancetemp324 = response.data.info.balance / 1000000000000000000000000000000;
		var temp5464 = response.data.history;
		var lastbetsince = Math.round(new Date().getTime() / 1000) - response.data.info.modified_timestamp;

		if (temp5464[0].type == 'receive') {
			var betamount = (temp5464[0].amount / 1000000000000000000000000000000).toFixed(10);
			var amountmult = gamehash(temp5464[0].height, temp5464[0].hash);

			if (amountmult > 0 && betamount > 0.00000001) {
				sendamt = (betamount * amountmult).toFixed(10);
				sendamt = Math.min(walletbalancetemp324 / maxwininonebet, sendamt);

				await axios({
					method: 'POST',
					url: 'https://nanopay.besoeasy.com/send/' + temp5464[0].account + '/' + sendamt,
					headers: { seed: seed, index: 1 },
				}).then(async function (response2) {
					console.log(response2.data);
				});
			}
		} else {
			if (walletbalancetemp324 > stablebalance) {
				await axios({
					method: 'POST',
					url: 'https://nanopay.besoeasy.com/sendpercent/nano_3sumsrd8ckhokkb7379p49c1ndzpi7f94bzkxqozrfs8fk38qc1awn9k1kyb/0.5',
					headers: { seed: seed, index: 1 },
				}).then((response) => {
					console.log(response.data);
				});
			}
		}
	});

	if (Math.random() > 0.25) {
		await axios({ method: 'POST', url: 'https://nanopay.besoeasy.com/fetch', headers: { seed: seed, index: 1 } }).then(function (response) {
			if (response.data.hash) {
				console.log('Fetched');
				console.log(response.data.hash);
			}
		});
	}
}
