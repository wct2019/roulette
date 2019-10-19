/**
 * WordCamp Tokyo 2019 景品スロット
 *
 * @version    0.1.0
 * @author     Takahiro Takamuku
 * @license    The MIT License
 */

// 初期起動時ボタン非表示処理
document.getElementById('pageback').style.visibility = 'hidden';
document.getElementById('stop').style.visibility = 'hidden';

// 商品一覧
var itemList;

// 商品の初期値
this.itemList = {
	// 商品番号: {商品名: 初期個数}
	0: {tshirt: 30},
	1: {sticker_history: 500},
	2: {bottle: 100},
	3: {mobilebattery: 100},
	4: {dorayaki: 120},
	5: {chocolate: 495},
	6: {bankerring: 100}
};

// ルーレットオブジェクト（獲得商品用）
var itemRoulette;

// ルーレットオブジェクト（ルーレット中の画面表示用）
var rouletteItemImg;

// 残り商品数分の要素を持つ配列。確率調整のために使用。
var itemArray = [];

// ルーレットのスピード（単位：ms）
var speed = 50;

// ルーレットで決まる獲得商品の商品番号
var itemNo;

// ルーレットで決まる獲得商品名
var getItemName;

// 全商品の種類（商品在庫がなくなっても変更しない変数）
const hashLength = Object.keys(itemList).length;

// 現在の商品数分の要素を持つ配列を作成。
var currentItems = function () {
	for ( var i = 0; i < hashLength; i++ ) {
		// ある商品番号が存在すれば(ある商品の在庫があれば)、その商品の残り個数分の要素を配列に追加。
		if(itemList[i]) {
			console.log('商品在庫', itemList[i]);
			for ( j = 0; j < itemList[i][Object.keys(itemList[i])]; j++ ){
				this.itemArray.push(i);
			}
		} else {
			continue;
		}
	}
}

// ランダムに商品番号を選択する関数（確率考慮済み）
var randomItem = function (itemArray) {
	return Math.floor(itemArray.length * Math.random());
}

// ルーレットを開始
function start() {
	// ルーレットを回す前に配列の作り直しを毎回行う
	this.itemArray = [];
	currentItems();

	// ルーレット中には次のルーレットが開始できないようにボタンを隠す
	document.getElementById('pageback').style.visibility = 'hidden';
	// startが二回押せないようにボタンを隠す
	document.getElementById('start').style.visibility = 'hidden';
	// ルーレット実行中はstopボタンが押せるようにボタンを表示
	document.getElementById('stop').style.visibility = 'visible';

  this.itemRoulette = setInterval(function() {
		// ルーレットで獲得商品番号を決定
		var arrayNo = randomItem(itemArray);
		this.itemNo = itemArray[arrayNo];
		// ※setIntervalのリターン値はInterval ID
  }, this.speed);
}

// ルーレット中の画像を画面に表示
function slot() {
	var rand;

	this.rouletteItemImg = setInterval(function() {
		// 商品番号のランダムな選択（獲得商品とは別）
		rand = Math.floor(hashLength * Math.random());

		var slotImg = Object.keys(itemList[rand]);

		// スロット中の商品の画像を表示
		var slotItemImg = document.getElementById('img');
		slotItemImg.setAttribute('src', 'img/' + slotImg + '.png');
	}, this.speed);
}

// ルーレットを停止
function stop() {
	if(itemRoulette) {
		clearInterval(itemRoulette);
		console.log('獲得商品番号:', this.itemNo);
		console.log('ルーレット前商品個数:', itemList[itemNo], itemList[itemNo][Object.keys(itemList[itemNo])]);
		// 獲得商品の残り個数を１減らす
		itemList[itemNo][Object.keys(itemList[itemNo])] -= 1;

		this.getItemName = Object.keys(itemList[itemNo]);

		// 画面下部に獲得商品文字列を表示する
		document.getElementById('result').style.visibility = 'visible';

		// 獲得商品文字列を、商品に合わせて日本語で表示する
		switch (getItemName.toString()) {
			case 'tshirt':
				$('#result').text('T-シャツ').fadeIn(300);
				break;
			case 'sticker_history':
				$('#result').text('歴代わぷーステッカー').fadeIn(300);
				break;
			case 'bottle':
				$('#result').text('アルミボトル').fadeIn(300);
				break;
			case 'mobilebattery':
				$('#result').text('モバイルバッテリー').fadeIn(300);
				break;
			case 'dorayaki':
				$('#result').text('どらやき').fadeIn(300);
				break;
			case "chocolate":
				$('#result').text('カスタムチョコレート').fadeIn(300);
				break;
			case 'bankerring':
				$('#result').text('バンカーリング').fadeIn(300);
				break;
		}

		// スロット表示中の画像を止める
		clearInterval(rouletteItemImg);

		// 当選した商品の画像を表示
		var getItemImg = document.getElementById('img');
		getItemImg.setAttribute('src', 'img/' + this.getItemName + '.png');

		// ルーレット中には次のルーレットが開始できないようにボタンを隠す
		document.getElementById('pageback').style.visibility = 'visible';
		// ルーレット実行後はstopボタンが押せないようにボタンを隠す
		document.getElementById('stop').style.visibility = 'hidden';

		console.log('ルーレット後商品個数:', itemList[itemNo], itemList[itemNo][Object.keys(itemList[itemNo])]);
		console.log('-------------------------');
	}
}

// ルーレット実行後、次のルーレット開始画面へ行く処理
function pageback() {
	// 商品一覧画像を表示
	var defaultImg = document.getElementById('img');
	defaultImg.setAttribute('src', 'img/img_start.png');

	document.getElementById('pageback').style.visibility = 'hidden';
	document.getElementById('result').style.display = 'none';
	document.getElementById('start').style.visibility = 'visible';
}



// 在庫の確認を行う
$('#staffControlBtn').on('click',function(){
	$('#displayitemsStock').addClass('on');
	itemcheck();
});
function itemcheck() {
	console.log(this.itemList);
	// 在庫数更新画面を表示
	document.getElementById('tshirt').textContent = itemList[0].tshirt;
	document.getElementById('sticker_history').textContent = itemList[1].sticker_history;
	document.getElementById('bottle').textContent = itemList[2].bottle;
	document.getElementById('mobilebattery').textContent = itemList[3].mobilebattery;
	document.getElementById('dorayaki').textContent = itemList[4].dorayaki;
	document.getElementById('chocolate').textContent = itemList[5].chocolate;
	document.getElementById('bankerring').textContent = itemList[6].bankerring;
}
$('#closeStock').on('click',function(){
	$('#displayitemsStock').removeClass('on');
});

// T-シャツ 在庫数の更新
function tshirtIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[0].tshirt += Number(document.getElementById('tshirtupdate').value);
	itemcheck();
}

function tshirtDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[0].tshirt -= Number(document.getElementById('tshirtupdate').value);
	if (itemList[0].tshirt < 0) {
		itemList[0].tshirt = 0;
	}
	itemcheck();
}
// T-シャツ 在庫数の更新ここまで

// 歴代わぷーステッカー 在庫数の更新
function stickerHistoryIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[1].sticker_history += Number(document.getElementById('stickerhistoryupdate').value);
	itemcheck();
}

function stickerHistoryDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[1].sticker_history -= Number(document.getElementById('stickerhistoryupdate').value);
	if (itemList[1].sticker_history < 0) {
		itemList[1].sticker_history = 0;
	}
	itemcheck();
}
// 歴代わぷーステッカー 在庫数の更新ここまで

// アルミボトル 在庫数の更新
function bottleIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[2].bottle += Number(document.getElementById('bottleupdate').value);
	itemcheck();
}

function bottleDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[2].bottle -= Number(document.getElementById('bottleupdate').value);
	if (itemList[2].bottle < 0) {
		itemList[2].bottle = 0;
	}
	itemcheck();
}
// アルミボトル 在庫数の更新ここまで

// モバイルバッテリー 在庫数の更新
function mobilebatteryIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[3].mobilebattery += Number(document.getElementById('mobilebatteryupdate').value);
	itemcheck();
}

function mobilebatteryDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[3].mobilebattery -= Number(document.getElementById('mobilebatteryupdate').value);
	if (itemList[3].mobilebattery < 0) {
		itemList[3].mobilebattery = 0;
	}
	itemcheck();
}
// モバイルバッテリー 在庫数の更新ここまで

// どらやき 在庫数の更新
function dorayakiIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[4].dorayaki += Number(document.getElementById('dorayakiupdate').value);
	itemcheck();
}

function dorayakiDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[4].dorayaki -= Number(document.getElementById('dorayakiupdate').value);
	if (itemList[4].dorayaki < 0) {
		itemList[4].dorayaki = 0;
	}
	itemcheck();
}
// どらやき 在庫数の更新ここまで

// カスタムチョコレート 在庫数の更新
function chocolateIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[5].chocolate += Number(document.getElementById('chocolateupdate').value);
	itemcheck();
}

function chocolateDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[5].chocolate -= Number(document.getElementById('chocolateupdate').value);
	if (itemList[5].chocolate < 0) {
		itemList[5].chocolate = 0;
	}
	itemcheck();
}
// カスタムチョコレート 在庫数の更新ここまで

// バンカーリング 在庫数の更新
function bankerringIncrement() {
	// 獲得商品の残り個数を増やす
	itemList[6].bankerring += Number(document.getElementById('bankerringupdate').value);
	itemcheck();
}

function bankerringDecrement() {
	// 獲得商品の残り個数を減らす
	itemList[6].bankerring -= Number(document.getElementById('bankerringupdate').value);
	if (itemList[6].bankerring < 0) {
		itemList[6].bankerring = 0;
	}
	itemcheck();
}
// バンカーリング 在庫数の更新ここまで
