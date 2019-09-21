/**
 * WordCamp Tokyo 2015 景品スロット
 *
 * @version    0.1.0-beta
 * @author     Keisuke Imura <keisuke@keisuke-imura.com>
 * @license    The MIT License
 * @link       http://funteractive.jp/
 */

// 初期起動時ボタン非表示処理
document.getElementById('pageback').style.visibility = 'hidden';
document.getElementById('stop').style.visibility = 'hidden';

// 商品一覧
var itemList

// 商品の初期値
this.itemList = {
	// 商品番号: {商品名: 初期個数}
	0: {tshirt: 1},
	1: {sticker2019: 1},
	2: {sticker_history: 1},
	3: {bottle: 1},
	4: {mobilebattery: 1},
	5: {dorayaki: 1},
	6: {choco: 1},
	7: {bankerring: 1}
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
		$('#result').text(getItemName).fadeIn(300);

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

	// スタートボタンへの置き換え（今の所は仮。デザイン決定後、実装変更）
  $('#result').text('デザイン決定後実装').fadeIn(300);

	document.getElementById('pageback').style.visibility = 'hidden';
	document.getElementById('start').style.visibility = 'visible';
}
