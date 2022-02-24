(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ArrayOfArray = function() {
	this.arrays = [];
};
ArrayOfArray.__name__ = "ArrayOfArray";
ArrayOfArray.prototype = {
	get_length: function() {
		return this.arrays.length;
	}
	,getElement: function(list,index) {
		return this.arrays[list][index];
	}
	,setElement: function(list,index,element) {
		this.arrays[list][index] = element;
		return element;
	}
	,adjustLength: function(length) {
		while(this.arrays.length < length) this.arrays.push([]);
	}
	,adjustLengthOfList: function(list,length) {
		while(this.arrays[list].length < length) this.arrays[list].push(null);
	}
	,__class__: ArrayOfArray
};
var seedyrng_Random = function(seed,generator) {
	if(seed == null) {
		var this1 = new haxe__$Int64__$_$_$Int64(seedyrng_Random.randomSystemInt(),seedyrng_Random.randomSystemInt());
		seed = this1;
	}
	if(generator == null) {
		generator = new seedyrng_Xorshift128Plus();
	}
	this.generator = generator;
	this.set_seed(seed);
};
seedyrng_Random.__name__ = "seedyrng.Random";
seedyrng_Random.randomSystemInt = function() {
	var value = Std.random(255) << 24 | Std.random(255) << 16 | Std.random(255) << 8 | Std.random(255);
	return value;
};
seedyrng_Random.prototype = {
	get_seed: function() {
		return this.generator.get_seed();
	}
	,set_seed: function(value) {
		return this.generator.set_seed(value);
	}
	,get_state: function() {
		return this.generator.get_state();
	}
	,set_state: function(value) {
		return this.generator.set_state(value);
	}
	,get_usesAllBits: function() {
		return this.generator.get_usesAllBits();
	}
	,nextInt: function() {
		return this.generator.nextInt();
	}
	,nextFullInt: function() {
		if(this.generator.get_usesAllBits()) {
			return this.generator.nextInt();
		} else {
			var num1 = this.generator.nextInt();
			var num2 = this.generator.nextInt();
			num2 = num2 >>> 16 | num2 << 16;
			return num1 ^ num2;
		}
	}
	,setStringSeed: function(seed) {
		this.setBytesSeed(haxe_io_Bytes.ofString(seed));
	}
	,setBytesSeed: function(seed) {
		var hash = haxe_crypto_Sha1.make(seed);
		this.set_seed(hash.getInt64(0));
	}
	,random: function() {
		var upper = this.nextFullInt() & 2097151;
		var lower = this.nextFullInt();
		var lhs = upper * Math.pow(2,32);
		var floatNum = UInt.toFloat(lower) + lhs;
		var result = floatNum * Math.pow(2,-53);
		return result;
	}
	,randomInt: function(lower,upper) {
		return Math.floor(this.random() * (upper - lower + 1)) + lower;
	}
	,uniform: function(lower,upper) {
		return this.random() * (upper - lower) + lower;
	}
	,choice: function(array) {
		return array[this.randomInt(0,array.length - 1)];
	}
	,shuffle: function(array) {
		var _g = 0;
		var _g1 = array.length - 1;
		while(_g < _g1) {
			var index = _g++;
			var randIndex = this.randomInt(index,array.length - 1);
			var tempA = array[index];
			var tempB = array[randIndex];
			array[index] = tempB;
			array[randIndex] = tempA;
		}
	}
	,__class__: seedyrng_Random
};
var Std = function() { };
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
Math.__name__ = "Math";
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var seedyrng_Xorshift128Plus = function() {
	this._currentAvailable = false;
	var this1 = new haxe__$Int64__$_$_$Int64(0,1);
	this.set_seed(this1);
};
seedyrng_Xorshift128Plus.__name__ = "seedyrng.Xorshift128Plus";
seedyrng_Xorshift128Plus.prototype = {
	get_usesAllBits: function() {
		return false;
	}
	,get_seed: function() {
		return this._seed;
	}
	,set_seed: function(value) {
		var b_high = 0;
		var b_low = 0;
		if(!(value.high != b_high || value.low != b_low)) {
			var this1 = new haxe__$Int64__$_$_$Int64(0,1);
			value = this1;
		}
		this._seed = value;
		this._state0 = value;
		this._state1 = seedyrng_Xorshift128Plus.SEED_1;
		this._currentAvailable = false;
		return value;
	}
	,get_state: function() {
		var bytes = new haxe_io_Bytes(new ArrayBuffer(33));
		bytes.setInt64(0,this._seed);
		bytes.setInt64(8,this._state0);
		bytes.setInt64(16,this._state1);
		bytes.b[24] = this._currentAvailable ? 1 : 0;
		if(this._currentAvailable) {
			bytes.setInt64(25,this._current);
		}
		return bytes;
	}
	,set_state: function(value) {
		if(value.length != 33) {
			throw haxe_Exception.thrown("Wrong state size " + value.length);
		}
		this._seed = value.getInt64(0);
		this._state0 = value.getInt64(8);
		this._state1 = value.getInt64(16);
		this._currentAvailable = value.b[24] == 1;
		if(this._currentAvailable) {
			this._current = value.getInt64(25);
		}
		return value;
	}
	,stepNext: function() {
		var x = this._state0;
		var y = this._state1;
		this._state0 = y;
		var b = 23;
		b &= 63;
		var b1;
		if(b == 0) {
			var this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b1 = this1;
		} else if(b < 32) {
			var this1 = new haxe__$Int64__$_$_$Int64(x.high << b | x.low >>> 32 - b,x.low << b);
			b1 = this1;
		} else {
			var this1 = new haxe__$Int64__$_$_$Int64(x.low << b - 32,0);
			b1 = this1;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(x.high ^ b1.high,x.low ^ b1.low);
		x = this1;
		var a_high = x.high ^ y.high;
		var a_low = x.low ^ y.low;
		var b = 17;
		b &= 63;
		var b1;
		if(b == 0) {
			var this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b1 = this1;
		} else if(b < 32) {
			var this1 = new haxe__$Int64__$_$_$Int64(x.high >> b,x.high << 32 - b | x.low >>> b);
			b1 = this1;
		} else {
			var this1 = new haxe__$Int64__$_$_$Int64(x.high >> 31,x.high >> b - 32);
			b1 = this1;
		}
		var a_high1 = a_high ^ b1.high;
		var a_low1 = a_low ^ b1.low;
		var b = 26;
		b &= 63;
		var b1;
		if(b == 0) {
			var this1 = new haxe__$Int64__$_$_$Int64(y.high,y.low);
			b1 = this1;
		} else if(b < 32) {
			var this1 = new haxe__$Int64__$_$_$Int64(y.high >> b,y.high << 32 - b | y.low >>> b);
			b1 = this1;
		} else {
			var this1 = new haxe__$Int64__$_$_$Int64(y.high >> 31,y.high >> b - 32);
			b1 = this1;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(a_high1 ^ b1.high,a_low1 ^ b1.low);
		this._state1 = this1;
		var a = this._state1;
		var high = a.high + y.high | 0;
		var low = a.low + y.low | 0;
		if(haxe_Int32.ucompare(low,a.low) < 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		this._current = this1;
	}
	,nextInt: function() {
		if(this._currentAvailable) {
			this._currentAvailable = false;
			return this._current.low;
		} else {
			this.stepNext();
			this._currentAvailable = true;
			return this._current.high;
		}
	}
	,__class__: seedyrng_Xorshift128Plus
};
var Generation = function(seed) {
};
Generation.__name__ = "Generation";
Generation.GenerateNumber = function(seed,min,max) {
};
Generation.GenerateRepetitions = function(seed,procUnits,range) {
	var purs = [];
	Generation.random.setStringSeed(seed);
	var _g_current = 0;
	var _g_array = procUnits;
	while(_g_current < _g_array.length) {
		var _g1_value = _g_array[_g_current];
		var _g1_key = _g_current++;
		var index = _g1_key;
		var value = _g1_value;
		var repetitions = RandomExtender.Range(Generation.random,range);
		var _g = 0;
		var _g1 = repetitions;
		while(_g < _g1) {
			var i = _g++;
			var pur = new ProceduralUnitRepeated();
			pur.position = i;
			pur.total = repetitions;
			pur.proceduralUnit = value;
			pur.randomExtra.push(Generation.random.randomInt(0,1000));
			pur.randomExtra.push(Generation.random.randomInt(0,1000));
			pur.randomExtra.push(Generation.random.randomInt(0,1000));
			purs.push(pur);
		}
	}
	return purs;
};
Generation.Generate = function(seed,maxChar1,maxChar2,repetition,response,skipCharacteristicsFirstRound) {
	Generation.random.setStringSeed(seed);
	if(response == null) {
		var response1 = [];
	}
	var responseAux = [];
	var _g = 0;
	var _g1 = repetition;
	while(_g < _g1) {
		var rep = _g++;
		var _g2 = 0;
		var _g3 = maxChar1;
		while(_g2 < _g3) {
			var c1 = _g2++;
			if(skipCharacteristicsFirstRound != null && repetition == 0 && skipCharacteristicsFirstRound.indexOf(c1) != -1) {
				continue;
			}
			var _g4 = 0;
			var _g5 = maxChar2;
			while(_g4 < _g5) {
				var c2 = _g4++;
				var pu = new ProceduralUnit();
				pu.characteristics[0] = c1;
				pu.characteristics[1] = c2;
				pu.repeat = rep;
				responseAux.push(pu);
			}
		}
		Generation.random.shuffle(responseAux);
		var _g6 = 0;
		while(_g6 < responseAux.length) {
			var unit = responseAux[_g6];
			++_g6;
			response.push(unit);
		}
		responseAux.length = 0;
	}
	return response;
};
Generation.prototype = {
	__class__: Generation
};
var ProceduralUnit = function() {
	this.repeat = 0;
	this.characteristics = [];
};
ProceduralUnit.__name__ = "ProceduralUnit";
ProceduralUnit.prototype = {
	__class__: ProceduralUnit
};
var ProceduralUnitRepeated = function() {
	this.randomExtra = [];
	this.total = 0;
	this.position = 0;
};
ProceduralUnitRepeated.__name__ = "ProceduralUnitRepeated";
ProceduralUnitRepeated.prototype = {
	__class__: ProceduralUnitRepeated
};
var ArrayHelper = function() { };
ArrayHelper.__name__ = "ArrayHelper";
ArrayHelper.InsertOnEmpty = function(ele,array) {
	if(array.indexOf(null) != -1) {
		var id = array.indexOf(null);
		array[id] = ele;
		return id;
	}
	array.push(ele);
	return array.length - 1;
};
var BattleManager = function() {
	this.enemyAreaFromProcedural = new EnemyAreaFromProceduralUnitRepetition();
	this.equipmentToDiscard = [];
	this.volatileAttributeAux = [];
	this.volatileAttributeList = ["MP","Life","MPRechargeCount","SpeedCount"];
	this.skillSlotUnlocklevel = [2,7,22,35];
	this.regionPrizes = [{ statBonus : null, xpPrize : true}];
	this.regionRequirements = [0];
	this.playerActions = new haxe_ds_StringMap();
	this.events = [];
	this.statCopyAux = new haxe_ds_StringMap();
	this.fixedRandom = new seedyrng_Random();
	this.random = new seedyrng_Random();
	this.equipMaxPerType = 100;
	this.equipDropChance_Rare = 15;
	this.equipDropChance = 30;
	this.timePeriod = 0.6;
	this.turnList = [];
	this.prestiged = false;
	this.enemySheets = [];
	this.canLevelUp = false;
	this.canAdvance = false;
	this.canRetreat = false;
	this.dirty = false;
	this.balancing = { timeToKillFirstEnemy : 5, timeForFirstAreaProgress : 20, timeForFirstLevelUpGrind : 90, areaBonusXPPercentOfFirstLevelUp : 60};
	var bm = this;
	bm.enemySheets.push({ speciesMultiplier : null, speciesLevelStats : null, speciesAdd : null});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 0.55;
	_g.h["Speed"] = 3.3;
	_g.h["LifeMax"] = 1.6;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Speed"] = 1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, speciesLevelStats : { attributesBase : _g1}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Speed"] = 2;
	_g.h["LifeMax"] = 3;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 4;
	_g.h["Speed"] = 0.09;
	_g.h["LifeMax"] = 4;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Speed"] = 0.05;
	_g1.h["Defense"] = 0.4;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, speciesLevelStats : { attributesBase : _g1}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 2;
	_g.h["LifeMax"] = 5;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1.4;
	_g.h["Speed"] = 0.15;
	_g.h["LifeMax"] = 5.5;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Defense"] = 5;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 1;
	_g2.h["Speed"] = 0.05;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : _g1, speciesLevelStats : { attributesBase : _g2}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Defense"] = 1;
	_g.h["LifeMax"] = 8;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1.4;
	_g.h["Speed"] = 1.1;
	_g.h["LifeMax"] = 1.7;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Piercing"] = 100;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 0.2;
	_g2.h["Speed"] = 0.1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : _g1, speciesLevelStats : { attributesBase : _g2}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1;
	_g.h["Speed"] = 1;
	_g.h["LifeMax"] = 3;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 10;
	_g.h["Speed"] = 3.5;
	_g.h["LifeMax"] = 0.1;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Defense"] = 0.2;
	_g1.h["Speed"] = 0.1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, speciesLevelStats : { attributesBase : _g1}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 3;
	_g.h["Speed"] = 2;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 0.5;
	_g.h["Speed"] = 2.9;
	_g.h["LifeMax"] = 2;
	_g.h["Defense"] = 0.3;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Antibuff"] = 1;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 0.2;
	_g2.h["Speed"] = 0.1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : _g1, speciesLevelStats : { attributesBase : _g2}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Speed"] = 2;
	_g.h["LifeMax"] = 3;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1;
	_g.h["Speed"] = 0.8;
	_g.h["LifeMax"] = 2;
	_g.h["Defense"] = 0.4;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Attack"] = 800;
	_g1.h["Defense"] = 800;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 0.2;
	_g2.h["Speed"] = 0.1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, initialBuff : { uniqueId : "Power Up", mulStats : _g1, duration : 3, addStats : null, strength : 100}, speciesLevelStats : { attributesBase : _g2}});
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 2;
	_g.h["LifeMax"] = 3;
	bm1.push({ xpPrize : false, statBonus : _g});
	var bm1 = bm.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1.8;
	_g.h["Speed"] = 1.4;
	_g.h["LifeMax"] = 2;
	_g.h["Defense"] = 0.5;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["DebuffProtection"] = 100;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 0.2;
	_g2.h["Speed"] = 0.1;
	bm1.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : _g1, speciesLevelStats : { attributesBase : _g2}});
	var _g = 0;
	var _g1 = bm.enemySheets;
	while(_g < _g1.length) {
		var unknown = _g1[_g];
		++_g;
		unknown.viewAux = 3;
	}
	var bm1 = bm.regionPrizes;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1;
	_g.h["Defense"] = 1;
	_g.h["LifeMax"] = 3;
	bm1.push({ xpPrize : false, statBonus : _g});
	bm.regionRequirements = [0,5,9,14,18,22,30,42,50];
	if(bm.regionPrizes.length > bm.regionRequirements.length) {
		console.log("Sources\GRI\logic/BattleManager.hx:967:","PROBLEM: Tell developer to add more region requirements!!!");
	}
	this.enemyAreaFromProcedural.enemySheets.push({ speciesMultiplier : null, speciesLevelStats : null, speciesAdd : null});
	this.enemyAreaFromProcedural.equipments.push(null);
	var tmp = this.enemyAreaFromProcedural.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 0.6;
	_g.h["Speed"] = 1.3;
	_g.h["LifeMax"] = 0.85;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Speed"] = 0.6;
	tmp.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, speciesLevelStats : { attributesBase : _g1}});
	this.enemyAreaFromProcedural.equipments.push(null);
	var tmp = this.enemyAreaFromProcedural.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1.8;
	_g.h["Speed"] = 0.3;
	_g.h["LifeMax"] = 1.2;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Speed"] = 0.05;
	_g1.h["Defense"] = 0.05;
	tmp.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : null, speciesLevelStats : { attributesBase : _g1}});
	this.enemyAreaFromProcedural.equipments.push(null);
	var tmp = this.enemyAreaFromProcedural.enemySheets;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 0.9;
	_g.h["Speed"] = 0.5;
	_g.h["LifeMax"] = 1.3;
	var _g1 = new haxe_ds_StringMap();
	_g1.h["Defense"] = 1;
	var _g2 = new haxe_ds_StringMap();
	_g2.h["Defense"] = 0.1;
	_g2.h["Speed"] = 0;
	tmp.push({ speciesMultiplier : { attributesBase : _g}, speciesAdd : _g1, speciesLevelStats : { attributesBase : _g2}});
	this.enemyAreaFromProcedural.equipments.push(null);
	this.enemyAreaFromProcedural.equipments.push(null);
	var tmp = this.enemyAreaFromProcedural.equipments;
	var _g = new haxe_ds_StringMap();
	_g.h["thunder-damage"] = 250;
	_g.h["fire-damage"] = 30;
	tmp.push({ type : 0, seen : 2, requiredAttributes : null, attributes : _g});
	var tmp = this.enemyAreaFromProcedural.equipments;
	var _g = new haxe_ds_StringMap();
	_g.h["fire-damage"] = 250;
	_g.h["ice-damage"] = 30;
	tmp.push({ type : 0, seen : 2, requiredAttributes : null, attributes : _g});
	var tmp = this.enemyAreaFromProcedural.equipments;
	var _g = new haxe_ds_StringMap();
	_g.h["ice-damage"] = 250;
	_g.h["thunder-damage"] = 30;
	tmp.push({ type : 0, seen : 2, requiredAttributes : null, attributes : _g});
	var pus = [];
	var pu = new ProceduralUnit();
	pu.characteristics.push(0);
	pu.characteristics.push(0);
	pu.repeat = 0;
	pus.push(pu);
	var pu = new ProceduralUnit();
	pu.characteristics.push(1);
	pu.characteristics.push(0);
	pu.repeat = 0;
	pus.push(pu);
	pus = Generation.Generate("w1",8,1,3,pus,[0,1]);
	var purs = Generation.GenerateRepetitions("w1",pus,{ min : 3, max : 6});
	this.enemyAreaFromProcedural.units = purs;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = 1;
	_g.h["Life"] = 20;
	_g.h["LifeMax"] = 20;
	_g.h["Speed"] = 20;
	_g.h["SpeedCount"] = 0;
	var stats = _g;
	var w = { worldVersion : 2200, hero : { level : 1, attributesBase : null, equipment : null, xp : null, attributesCalculated : stats, reference : new ActorReference(0,0), viewAux : 0}, enemy : null, maxArea : 1, necessaryToKillInArea : 0, killedInArea : [0,0], prestigeTimes : 0, timeCount : 0, playerTimesKilled : 0, battleArea : 0, battleAreaRegion : 0, battleAreaRegionMax : 1, playerActions : new haxe_ds_StringMap(), recovering : false, sleeping : false, regionProgress : []};
	this.wdata = w;
	this.ReinitGameValues();
	this.ChangeBattleArea(0);
	var v = this.wdata.hero.attributesCalculated.h["LifeMax"];
	this.wdata.hero.attributesCalculated.h["Life"] = v;
};
BattleManager.__name__ = "BattleManager";
BattleManager.IsLimitBreakable = function(e,wdata) {
	var level = wdata.equipLevels[e.outsideSystems.h["level"]];
	return level.limitbreak < 3;
};
BattleManager.IsUpgradable = function(e,wdata) {
	var level = wdata.equipLevels[e.outsideSystems.h["level"]];
	var maxLevel = level.limitbreak * 3 + 3;
	var upgradable = level.level < maxLevel;
	return upgradable;
};
BattleManager.GetLimitBreakCost = function(e,wdata) {
	return ((BattleManager.GetCost(e,wdata) + 1) / 5 | 0) * 3;
};
BattleManager.GetSellPrize = function(e,wdata) {
	return BattleManager.GetCost(e,wdata) / 5 | 0;
};
BattleManager.GetCost = function(e,wdata) {
	var genLevel = 1;
	if(e.generationLevel >= 0) {
		genLevel = e.generationLevel;
	}
	if(e.generationPrefixMod >= 0) {
		genLevel += 5;
	}
	if(e.generationSuffixMod >= 0) {
		genLevel += 5;
	}
	return (genLevel / 5 | 0) * 5 + 5;
};
BattleManager.CanUpgrade = function(e,wdata) {
	if(BattleManager.IsUpgradable(e,wdata) == false) {
		return false;
	}
	return BattleManager.GetCost(e,wdata) <= wdata.currency.currencies.h["Lagrima"].value;
};
BattleManager.CanLimitBreak = function(e,wdata) {
	if(BattleManager.IsLimitBreakable(e,wdata) == false) {
		return false;
	}
	return BattleManager.GetLimitBreakCost(e,wdata) <= wdata.currency.currencies.h["Lagrima Stone"].value;
};
BattleManager.LimitBreak = function(e,wdata) {
	var cost = BattleManager.GetLimitBreakCost(e,wdata);
	wdata.currency.currencies.h["Lagrima Stone"].value -= cost;
	var level = wdata.equipLevels[e.outsideSystems.h["level"]];
	level.limitbreak++;
};
BattleManager.Upgrade = function(e,wdata,bm) {
	var cost = BattleManager.GetCost(e,wdata);
	wdata.currency.currencies.h["Lagrima"].value -= cost;
	var level = wdata.equipLevels[e.outsideSystems.h["level"]];
	level.level++;
	if(BattleManager.IsUpgradable(e,wdata) == false) {
		var bonus = BattleManager.GetLimitBreakCost(e,wdata) / 3 | 0;
		wdata.currency.currencies.h["Lagrima Stone"].value += bonus;
		var e1 = bm.AddEvent(EventTypes.EquipMaxed);
		e1.data = bonus;
		e1.dataString = "Lagrima Stone";
	}
	if(Object.prototype.hasOwnProperty.call(e.attributes.h,"Attack")) {
		var tmp = "Attack";
		var v = e.attributes.h[tmp] + 1;
		e.attributes.h[tmp] = v;
	}
	if(Object.prototype.hasOwnProperty.call(e.attributes.h,"MagicAttack")) {
		var tmp = "MagicAttack";
		var v = e.attributes.h[tmp] + 1;
		e.attributes.h[tmp] = v;
	}
	if(e.type == 1) {
		if(e.attributes.h["LifeMax"] >= 0 == false) {
			e.attributes.h["LifeMax"] = 0;
		}
		var _g = e.attributes;
		var v = _g.h["LifeMax"] + 2;
		_g.h["LifeMax"] = v;
	}
	if(level.level % 3 != 0) {
		if(Object.prototype.hasOwnProperty.call(e.attributes.h,"Defense")) {
			var tmp = "Defense";
			var v = e.attributes.h[tmp] + 1;
			e.attributes.h[tmp] = v;
		}
		if(Object.prototype.hasOwnProperty.call(e.attributes.h,"MagicDefense")) {
			var tmp = "MagicDefense";
			var v = e.attributes.h[tmp] + 1;
			e.attributes.h[tmp] = v;
		}
	}
};
BattleManager.prototype = {
	GetAttribute: function(actor,label) {
		var i = actor.attributesCalculated.h[label];
		if(i < 0) {
			i = 0;
		}
		return i;
	}
	,UseMP: function(actor,mpCost,event) {
		if(event == null) {
			event = true;
		}
		var mp = actor.attributesCalculated.h["MP"];
		mp -= mpCost;
		if(mp <= 0) {
			mp = 0;
			actor.attributesCalculated.h["MPRechargeCount"] = 0;
			if(event) {
				var ev = this.AddEvent(EventTypes.MPRunOut);
				ev.origin = this.wdata.hero.reference;
			}
		}
		actor.attributesCalculated.h["MP"] = mp;
	}
	,UseSkill: function(skill,actor,activeStep) {
		if(activeStep == null) {
			activeStep = false;
		}
		var id = skill.id;
		var skillBase = this.GetSkillBase(id);
		if(skillBase.turnRecharge > 0) {
			if(actor.turnRecharge == null) {
				actor.turnRecharge = [];
			}
			actor.turnRecharge[actor.usableSkills.indexOf(skill)] = skillBase.turnRecharge;
		}
		if(activeStep == false && skillBase.activeEffect != null) {
			this.scheduledSkill = skill;
			return;
		}
		if(actor == this.wdata.hero) {
			this.wdata.timeCount = 0;
		}
		var executedEffects = 0;
		var efs = skillBase.effects;
		if(activeStep) {
			efs = skillBase.activeEffect;
		}
		var skillUsed = false;
		var _g = 0;
		while(_g < efs.length) {
			var ef = efs[_g];
			++_g;
			var targets = [];
			if(ef.target == Target.SELF) {
				targets.push(actor);
			}
			if(ef.target == Target.ENEMY) {
				if(this.wdata.hero == actor) {
					if(this.wdata.enemy.attributesCalculated.h["LifeMax"] == 0) {
						this.CreateAreaEnemy();
					}
					targets.push(this.wdata.enemy);
				} else {
					targets.push(this.wdata.hero);
				}
			}
			++executedEffects;
			if(skillUsed == false) {
				skillUsed = true;
				var mpCost = skillBase.mpCost;
				this.UseMP(actor,mpCost);
				var ev = this.AddEvent(EventTypes.SkillUse);
				ev.origin = this.wdata.hero.reference;
				ev.dataString = skill.id;
			}
			ef.effectExecution(this,skill.level,actor,targets);
		}
	}
	,Heal: function(target,lifeMaxPercentage,rawBonus) {
		if(rawBonus == null) {
			rawBonus = 0;
		}
		if(lifeMaxPercentage == null) {
			lifeMaxPercentage = 0;
		}
		var lifem = target.attributesCalculated.h["LifeMax"];
		var life = target.attributesCalculated.h["Life"];
		life += rawBonus + (lifeMaxPercentage * lifem / 100 | 0);
		if(life > lifem) {
			life = lifem;
		}
		target.attributesCalculated.h["Life"] = life;
	}
	,RemoveBuffs: function(defender,keepDebuffs) {
		if(keepDebuffs == null) {
			keepDebuffs = true;
		}
		if(keepDebuffs == false) {
			defender.buffs.length = 0;
		} else {
			var i = 0;
			while(i < defender.buffs.length) {
				if(defender.buffs[i].debuff == true) {
					++i;
					continue;
				}
				HxOverrides.remove(defender.buffs,defender.buffs[i]);
			}
		}
		this.RecalculateAttributes(defender);
		this.AddEvent(EventTypes.BuffRemoval).origin = defender.reference;
	}
	,RefreshCalculatedTurnOrder: function() {
		this.turnList.length = 0;
		var hero = this.wdata.hero;
		var enemy = this.wdata.enemy;
		if(enemy == null) {
			return;
		}
		if(enemy.attributesCalculated.h["Life"] == 0) {
			return;
		}
		var countH = hero.attributesCalculated.h["SpeedCount"];
		var countE = enemy.attributesCalculated.h["SpeedCount"];
		var _g = 0;
		while(_g < 10000) {
			var i = _g++;
			var actorAct = -1;
			var bActor = hero;
			var count = countH;
			count += bActor.attributesCalculated.h["Speed"];
			if(actorAct == -1) {
				if(count > 1000) {
					actorAct = 0;
					count -= 1000;
				}
			}
			countH = count;
			var bActor1 = hero;
			var count1 = countH;
			bActor1 = enemy;
			count1 = countE;
			count1 += bActor1.attributesCalculated.h["Speed"];
			if(actorAct == -1) {
				if(count1 > 1000) {
					actorAct = 1;
					count1 -= 1000;
				}
			}
			countE = count1;
			if(actorAct >= 0) {
				this.turnList.push(actorAct);
			}
			if(this.turnList.length >= 6) {
				break;
			}
		}
	}
	,copyActorStatsToAux: function(actor) {
		this.statCopyAux.h = Object.create(null);
		var h = actor.attributesCalculated.h;
		var _g_h = h;
		var _g_keys = Object.keys(h);
		var _g_length = _g_keys.length;
		var _g_current = 0;
		while(_g_current < _g_length) {
			var key = _g_keys[_g_current++];
			var _g1_key = key;
			var _g1_value = _g_h[key];
			var key1 = _g1_key;
			var value = _g1_value;
			this.statCopyAux.h[key1] = value;
		}
		return this.statCopyAux;
	}
	,getStatsIfEquipped: function(actor,equipPos) {
		var es = actor.equipmentSets[actor.chosenEquipSet].equipmentSlots;
		var e = actor.equipment[equipPos];
		var type = e.type;
		var original = es[type];
		es[type] = equipPos;
		this.RecalculateAttributes(actor);
		var statAux = this.copyActorStatsToAux(actor);
		es[type] = original;
		this.RecalculateAttributes(actor);
		return statAux;
	}
	,AttackExecute: function(attacker,defender,attackRate,attackBonus,defenseRate,element) {
		if(defenseRate == null) {
			defenseRate = 100;
		}
		if(attackBonus == null) {
			attackBonus = 0;
		}
		if(attackRate == null) {
			attackRate = 100;
		}
		this.lastActiveActor = attacker;
		var gEvent = this.AddEvent(EventTypes.ActorAttack);
		var magicAttack = false;
		var enchant = attacker.attributesCalculated.h["enchant-fire"];
		if(enchant > 0) {
			magicAttack = true;
			attackBonus += enchant;
		}
		if(element != null) {
			magicAttack = true;
			var elementDmg = element + "-damage";
			if(Object.prototype.hasOwnProperty.call(defender.attributesCalculated.h,elementDmg)) {
				var baseDmg = defender.attributesCalculated.h[elementDmg];
				attackRate = attackRate * baseDmg / 100 | 0;
			}
		}
		if(attacker.attributesCalculated.h["Blood"] > 0) {
			var blood = attacker.attributesCalculated.h["Blood"];
			var bloodMul = 100;
			if(attacker.attributesCalculated.h["Bloodthirst"] > 0) {
				bloodMul += attacker.attributesCalculated.h["Bloodthirst"];
			}
			attackBonus += blood;
			attackRate += (blood * 5 + 10) * bloodMul / 100 | 0;
			var life = attacker.attributesCalculated.h["Life"];
			var decrease = attacker.attributesCalculated.h["LifeMax"] * blood / 100;
			if(decrease < 1) {
				decrease = 1;
			}
			if(decrease >= life - 1) {
				decrease = life - 1;
			}
			life -= decrease | 0;
			attacker.attributesCalculated.h["Life"] = life;
		}
		if(attacker.attributesCalculated.h["Antibuff"] > 0) {
			this.RemoveBuffs(defender);
		}
		if(magicAttack == false) {
			if(attacker.attributesCalculated.h["Piercing"] > 0 == true) {
				defenseRate -= attacker.attributesCalculated.h["Piercing"];
			}
		}
		if(defenseRate < 0) {
			defenseRate = 0;
		}
		var attack = 0;
		var defense = 0;
		if(magicAttack) {
			attack = attacker.attributesCalculated.h["MagicAttack"];
			defense = defender.attributesCalculated.h["MagicDefense"];
		} else {
			attack = attacker.attributesCalculated.h["Attack"];
			defense = defender.attributesCalculated.h["Defense"];
		}
		attack = attackRate * attack / 100 + attackBonus;
		var damage = attack - defense * defenseRate / 100 | 0;
		if(damage < 0) {
			damage = 0;
		}
		var _g = defender.attributesCalculated;
		var v = _g.h["Life"] - damage;
		_g.h["Life"] = v;
		if(defender.attributesCalculated.h["Life"] < 0) {
			defender.attributesCalculated.h["Life"] = 0;
		}
		if(damage >= 1) {
			var _g = 0;
			var _g1 = defender.buffs;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				if(b.noble == true) {
					b.duration = 0;
				}
			}
		}
		gEvent.origin = attacker.reference;
		gEvent.target = defender.reference;
		gEvent.data = damage;
		var hero = this.wdata.hero;
		var enemy = this.wdata.enemy;
		var killedInArea = this.wdata.killedInArea;
		var battleArea = this.wdata.battleArea;
		var areaComplete = killedInArea[battleArea] >= this.wdata.necessaryToKillInArea;
		if(enemy.attributesCalculated.h["Life"] <= 0) {
			if(killedInArea[battleArea] == null) {
				killedInArea[battleArea] = 0;
			}
			killedInArea[battleArea]++;
			if(this.wdata.battleAreaRegion == 0) {
				this.DropItemOrSkillSet(this.equipDropChance,1,enemy.level,enemy.reference);
			}
			var e = this.AddEvent(EventTypes.ActorDead);
			e.origin = enemy.reference;
			var xpGain = enemy.level;
			this.AwardXP(enemy.level);
			if(killedInArea[battleArea] >= this.wdata.necessaryToKillInArea) {
				this.AddEvent(EventTypes.AreaComplete).data = this.wdata.battleArea;
				if(this.wdata.maxArea == this.wdata.battleArea) {
					if(this.regionPrizes[this.wdata.battleAreaRegion].xpPrize == true) {
						var areaForBonus = this.wdata.battleArea;
						ResourceLogic.recalculateScalingResource(areaForBonus,this.areaBonus);
						var xpPlus = this.areaBonus.calculatedMax;
						this.AwardXP(xpPlus);
					}
					if(this.regionPrizes[this.wdata.battleAreaRegion].statBonus != null) {
						var h = this.regionPrizes[this.wdata.battleAreaRegion].statBonus.h;
						var su_h = h;
						var su_keys = Object.keys(h);
						var su_length = su_keys.length;
						var su_current = 0;
						while(su_current < su_length) {
							var key = su_keys[su_current++];
							var su_key = key;
							var su_value = su_h[key];
							var e = this.AddEvent(EventTypes.statUpgrade);
							e.dataString = su_key;
							e.data = su_value;
						}
						this.AddEvent(EventTypes.PermanentStatUpgrade);
					}
					this.wdata.maxArea++;
					this.AddEvent(EventTypes.AreaUnlock).data = this.wdata.maxArea;
					killedInArea[this.wdata.maxArea] = 0;
				}
			}
		}
		if(hero.attributesCalculated.h["Life"] <= 0) {
			this.wdata.recovering = true;
			this.wdata.enemy = null;
			var e = this.AddEvent(EventTypes.ActorDead);
			e.origin = hero.reference;
			this.wdata.playerTimesKilled++;
		}
	}
	,ForceSkillSetDrop: function(enemyLevel,dropperReference,ss,event) {
		if(event == null) {
			event = true;
		}
		var scalingStats = new haxe_ds_StringMap();
		switch(this.random.randomInt(0,2)) {
		case 0:
			scalingStats.h["Attack"] = 0.3;
			break;
		case 1:
			scalingStats.h["Defense"] = 0.3;
			break;
		case 2:
			scalingStats.h["Speed"] = 0.1;
			break;
		}
		var itemB = { type : 2, statMultipliers : null, scalingStats : scalingStats, statAdd : null, name : null};
		if(this.wdata.skillSets == null) {
			this.wdata.skillSets = [];
		}
		var skillSetPos = ArrayHelper.InsertOnEmpty(ss,this.wdata.skillSets);
		this.DropItem(itemB,-1,skillSetPos,enemyLevel,dropperReference,event);
	}
	,ResetEquipToBaseLevel: function(equipment,level) {
		var baseItem = equipment.generationBaseItem;
		if(baseItem >= 0) {
			var ib = this.itemBases[baseItem];
			if(ib != null) {
				var h = ib.scalingStats.h;
				var _g_h = h;
				var _g_keys = Object.keys(h);
				var _g_length = _g_keys.length;
				var _g_current = 0;
				while(_g_current < _g_length) {
					var key = _g_keys[_g_current++];
					var _g1_key = key;
					var _g1_value = _g_h[key];
					var key1 = _g1_key;
					var value = _g1_value;
					var v = value * level | 0;
					equipment.attributes.h[key1] = v;
				}
				equipment.generationLevel = 1;
				return true;
			}
			return false;
		}
		return false;
	}
	,DropItemOrSkillSet: function(itemDropProbability,skillSetDropProbability,enemyLevel,dropperReference) {
		if(skillSetDropProbability == null) {
			skillSetDropProbability = 2;
		}
		var baseItem = -1;
		var itemB = null;
		if(this.random.randomInt(0,1000) < skillSetDropProbability * 10) {
			var skillPosArray = [];
			var baseLevel = 1;
			var maxLevel = 1;
			var maxNSkills = 2;
			if(this.wdata.enemy.level > 5) {
				maxNSkills = 3;
			}
			if(this.wdata.enemy.level > 10) {
				maxLevel = 2;
			}
			if(this.wdata.enemy.level > 25) {
				maxNSkills = 4;
			}
			if(this.wdata.enemy.level > 35) {
				maxLevel = 4;
			}
			var numberOfSkills = this.random.randomInt(1,maxNSkills);
			var _g = 0;
			var _g1 = numberOfSkills;
			while(_g < _g1) {
				var s = _g++;
				var skill = this.random.randomInt(0,this.skillBases.length - 1 - s);
				while(skillPosArray.indexOf(skill) != -1) ++skill;
				skillPosArray[s] = skill;
			}
			var ss = { skills : []};
			var _g = 0;
			var _g1 = skillPosArray.length;
			while(_g < _g1) {
				var j = _g++;
				var level = baseLevel;
				level = this.random.randomInt(baseLevel,maxLevel);
				if(j >= 2) {
					level = maxLevel + 1;
				}
				if(j >= 3) {
					level = maxLevel + 2;
				}
				var sp = skillPosArray[j];
				ss.skills.push({ id : this.skillBases[sp].id, level : level});
			}
			this.ForceSkillSetDrop(enemyLevel,dropperReference,ss);
			return;
		}
		if(this.random.randomInt(0,100) < itemDropProbability) {
			baseItem = this.random.randomInt(0,this.itemBases.length - 1);
			itemB = this.itemBases[baseItem];
			this.DropItem(itemB,baseItem,-1,enemyLevel,dropperReference);
		}
	}
	,DropItem: function(itemB,baseItem,skillSetPos,enemyLevel,dropperReference,event) {
		if(event == null) {
			event = true;
		}
		var e = null;
		var stat = new haxe_ds_StringMap();
		var statVar = new haxe_ds_StringMap();
		var mul = new haxe_ds_StringMap();
		var mulVar = new haxe_ds_StringMap();
		var minLevel = (enemyLevel + 1) / 2 - 3 | 0;
		if(minLevel < 1) {
			minLevel = 1;
		}
		var maxLevel = enemyLevel / 2 + 2 | 0;
		var level = this.random.randomInt(minLevel,maxLevel);
		var prefixPos = -1;
		var prefixSeed = -1;
		var suffixPos = -1;
		var suffixSeed = -1;
		if(itemB.scalingStats != null) {
			var h = itemB.scalingStats.h;
			var s_h = h;
			var s_keys = Object.keys(h);
			var s_length = s_keys.length;
			var s_current = 0;
			while(s_current < s_length) {
				var key = s_keys[s_current++];
				var s_key = key;
				var s_value = s_h[key];
				var vari = this.random.randomInt(80,100);
				statVar.h[s_key] = vari;
				var value = s_value * vari * level;
				if(value < 100) {
					value = 100;
				}
				var v = value / 100 | 0;
				stat.h[s_key] = v;
			}
		}
		if(itemB.statAdd != null) {
			var h = itemB.statAdd.h;
			var s_h = h;
			var s_keys = Object.keys(h);
			var s_length = s_keys.length;
			var s_current = 0;
			while(s_current < s_length) {
				var key = s_keys[s_current++];
				var s_key = key;
				var s_value = s_h[key];
				if(Object.prototype.hasOwnProperty.call(stat.h,s_key)) {
					var _g = s_key;
					var _g1 = stat;
					var v = _g1.h[_g] + s_value;
					_g1.h[_g] = v;
				} else {
					var v1 = s_value;
					stat.h[s_key] = v1;
				}
			}
		}
		if(itemB.statMultipliers != null) {
			var h = itemB.statMultipliers.h;
			var s_h = h;
			var s_keys = Object.keys(h);
			var s_length = s_keys.length;
			var s_current = 0;
			while(s_current < s_length) {
				var key = s_keys[s_current++];
				var s_key = key;
				var s_value = s_h[key];
				var vari = this.random.randomInt(0,100);
				mulVar.h[s_key] = vari;
				var min = s_value.min;
				var max = s_value.max;
				var range = max - min;
				var v = min + range * vari / 100 | 0;
				mul.h[s_key] = v;
			}
		}
		if(this.random.randomInt(0,100) < this.equipDropChance_Rare) {
			var modType = this.random.randomInt(0,2);
			var prefixExist = modType == 0 || modType == 2;
			var suffixExist = modType == 1 || modType == 2;
			if(prefixExist) {
				prefixPos = this.random.randomInt(0,this.modBases.length - 1);
				prefixSeed = this.random.nextInt();
				var tmp = this.modBases[prefixPos];
				var this1 = new haxe__$Int64__$_$_$Int64(prefixSeed >> 31,prefixSeed);
				this.AddMod(tmp,stat,mul,this1);
			}
			if(suffixExist) {
				suffixPos = this.random.randomInt(0,this.modBases.length - 1);
				suffixSeed = this.random.nextInt();
				var tmp = this.modBases[suffixPos];
				var this1 = new haxe__$Int64__$_$_$Int64(suffixSeed >> 31,suffixSeed);
				this.AddMod(tmp,stat,mul,this1);
			}
		}
		var h = mul.h;
		var m_h = h;
		var m_keys = Object.keys(h);
		var m_length = m_keys.length;
		var m_current = 0;
		while(m_current < m_length) {
			var key = m_keys[m_current++];
			var m_key = key;
			var m_value = m_h[key];
			if(m_value % 5 != 0) {
				var v = ((m_value + 4) / 5 | 0) * 5;
				mul.h[m_key] = v;
			}
		}
		var outsideSystem = new haxe_ds_StringMap();
		if(this.wdata.equipLevels == null) {
			this.wdata.equipLevels = [];
		}
		if(skillSetPos >= 0) {
			outsideSystem.h["skillset"] = skillSetPos;
		}
		var v = ArrayHelper.InsertOnEmpty({ level : 0, limitbreak : 0, ascension : 0},this.wdata.equipLevels);
		outsideSystem.h["level"] = v;
		e = { type : itemB.type, seen : 0, requiredAttributes : null, attributes : stat, generationVariations : statVar, generationLevel : level, generationBaseItem : baseItem, attributeMultiplier : mul, generationVariationsMultiplier : mulVar, generationSuffixMod : suffixPos, generationPrefixMod : prefixPos, generationSuffixModSeed : suffixSeed, generationPrefixModSeed : prefixSeed, outsideSystems : outsideSystem};
		this.AddEquip(e,event,dropperReference);
	}
	,AddEquip: function(e,event,dropperReference) {
		var addedIndex = -1;
		var amountAlready = 0;
		var _g = 0;
		var _g1 = this.wdata.hero.equipment;
		while(_g < _g1.length) {
			var equip = _g1[_g];
			++_g;
			if(e.type == equip.type) {
				++amountAlready;
			}
		}
		if(amountAlready >= this.equipMaxPerType) {
			if(event) {
				var ev = this.AddEvent(EventTypes.EquipFullFail);
				ev.data = e.type;
			}
			return;
		}
		var _g = 0;
		var _g1 = this.wdata.hero.equipment.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.wdata.hero.equipment[i] == null) {
				this.wdata.hero.equipment[i] = e;
				addedIndex = i;
				break;
			}
		}
		if(addedIndex < 0) {
			this.wdata.hero.equipment.push(e);
			addedIndex = this.wdata.hero.equipment.length - 1;
		}
		if(event) {
			var e1 = this.AddEvent(EventTypes.EquipDrop);
			e1.data = addedIndex;
			e1.origin = dropperReference;
		}
		if(amountAlready >= this.equipMaxPerType - 1) {
			if(event) {
				var ev = this.AddEvent(EventTypes.EquipFullJustNow);
				ev.data = e.type;
			}
		}
	}
	,AddBuff: function(buff,actor) {
		var addBuff = true;
		if(buff.debuff == true) {
			var debpro = actor.attributesCalculated.h["DebuffProtection"];
			if(debpro > 0) {
				if(this.random.randomInt(1,100) < debpro) {
					this.AddEvent(EventTypes.DebuffBlock).origin = actor.reference;
					return;
				}
			}
		}
		var _g = 0;
		var _g1 = actor.buffs.length;
		while(_g < _g1) {
			var bi = _g++;
			var b = actor.buffs[bi];
			if(b.uniqueId == buff.uniqueId) {
				addBuff = false;
				if(b.strength < buff.strength) {
					actor.buffs[bi] = buff;
					break;
				}
				if(b.strength == buff.strength && b.duration < buff.duration) {
					actor.buffs[bi] = buff;
					break;
				}
			}
		}
		if(addBuff) {
			actor.buffs.push(buff);
		}
		this.RecalculateAttributes(actor);
	}
	,GetSkillBase: function(id) {
		var _g = 0;
		var _g1 = this.skillBases;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.id == id) {
				return s;
			}
		}
		return null;
	}
	,ChangeBattleArea: function(area) {
		if(this.wdata.killedInArea[this.wdata.battleArea] >= this.wdata.necessaryToKillInArea) {
			this.wdata.killedInArea[this.wdata.battleArea] = 0;
		}
		this.wdata.battleArea = area;
		this.wdata.necessaryToKillInArea = 0;
		if(this.wdata.killedInArea.length <= area) {
			this.wdata.killedInArea[area] = 0;
		}
		var initialEnemyToKill = this.balancing.timeForFirstAreaProgress / this.balancing.timeToKillFirstEnemy | 0;
		if(area > 0) {
			this.wdata.necessaryToKillInArea = initialEnemyToKill + ((area - 1) * initialEnemyToKill * 0.3 | 0);
			if(this.wdata.necessaryToKillInArea > initialEnemyToKill * 14) {
				this.wdata.necessaryToKillInArea = initialEnemyToKill * 14;
			}
			var fRand = this.fixedRandom;
			var x = area + 1;
			var this1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
			fRand.set_seed(this1);
			if(area > 4) {
				var mul = fRand.random() * 1.5 + 0.5;
				this.wdata.necessaryToKillInArea = this.wdata.necessaryToKillInArea * mul | 0;
			}
			if(this.enemyAreaFromProcedural != null && this.wdata.battleAreaRegion == 0) {
				var eAI = this.enemyAreaFromProcedural.GetEnemyAreaInformation(area - 1);
				if(eAI.nEnemies > 0) {
					this.wdata.necessaryToKillInArea = eAI.nEnemies;
				}
			}
			if(this.wdata.battleAreaRegion > 0) {
				this.wdata.necessaryToKillInArea = 3;
			}
			if(this.PlayerFightMode()) {
				this.CreateAreaEnemy();
			}
		} else {
			this.wdata.enemy = null;
		}
		ResourceLogic.recalculateScalingResource(this.wdata.battleArea,this.areaBonus);
		this.dirty = true;
	}
	,PlayerFightMode: function() {
		if(this.wdata.recovering != true) {
			return this.wdata.sleeping != true;
		} else {
			return false;
		}
	}
	,CalculateHeroMaxLevel: function() {
		return this.wdata.prestigeTimes * this.GetMaxLevelBonusOnPrestige() + 20;
	}
	,AwardXP: function(xpPlus) {
		if(this.wdata.hero.level < this.CalculateHeroMaxLevel()) {
			xpPlus += xpPlus * this.wdata.prestigeTimes * this.GetXPBonusOnPrestige() | 0;
			xpPlus += this.GetXPAddBonusOnPrestige();
			this.wdata.hero.xp.value += xpPlus;
			var e = this.AddEvent(EventTypes.GetXP);
			e.data = xpPlus;
		}
	}
	,GetMaxLevelBonusOnPrestige: function() {
		return 10;
	}
	,GetXPBonusOnPrestige: function() {
		return 0.05;
	}
	,GetXPAddBonusOnPrestige: function() {
		return this.wdata.prestigeTimes * 2;
	}
	,GetLevelRequirementForPrestige: function() {
		return this.CalculateHeroMaxLevel() - 10;
	}
	,CreateEnemy: function(region,area) {
		var enemyLevel = area;
		var sheet = this.enemySheets[region];
		var enemy;
		if(region > 0) {
			var oldLevel = enemyLevel;
			enemyLevel = 0;
			var _g = 0;
			var _g1 = oldLevel;
			while(_g < _g1) {
				var i = _g++;
				enemyLevel += 10;
				enemyLevel += i * 10;
			}
		}
		var equipment = null;
		var viewOverride = -1;
		if(region == 0 && this.enemyAreaFromProcedural != null && this.enemyAreaFromProcedural.units != null) {
			var areaInfo = this.enemyAreaFromProcedural.GetEnemyAreaInformation(area - 1);
			sheet = areaInfo.sheet;
			enemyLevel += areaInfo.level;
			equipment = areaInfo.equipment;
			viewOverride = areaInfo.viewOverride;
		}
		var timeToKillEnemy = this.balancing.timeToKillFirstEnemy;
		var initialAttackHero = 1;
		var heroAttackTime = this.timePeriod * 2;
		var heroDPS = initialAttackHero / heroAttackTime;
		var initialLifeEnemy = heroDPS * timeToKillEnemy | 0;
		var enemyLife = initialLifeEnemy + (enemyLevel - 1) * initialLifeEnemy;
		var enemyAttack = 1 + (enemyLevel - 1);
		var _g = new haxe_ds_StringMap();
		_g.h["Attack"] = enemyAttack;
		_g.h["Life"] = enemyLife;
		_g.h["LifeMax"] = enemyLife;
		_g.h["Speed"] = 20;
		_g.h["SpeedCount"] = 0;
		_g.h["Defense"] = 0;
		_g.h["MagicDefense"] = 0;
		_g.h["Piercing"] = 0;
		var stats2 = _g;
		enemy = { level : 1 + enemyLevel, attributesBase : stats2, equipment : [], xp : null, attributesCalculated : stats2, reference : new ActorReference(1,0), buffs : [], usableSkills : [], viewAux : 1};
		if(equipment != null) {
			var equipSlots = [];
			var _g1_current = 0;
			var _g1_array = equipment;
			while(_g1_current < _g1_array.length) {
				var _g2_value = _g1_array[_g1_current];
				var _g2_key = _g1_current++;
				var index = _g2_key;
				var value = _g2_value;
				enemy.equipment.push(value);
				equipSlots.push(index);
			}
			enemy.equipmentSets = [{ equipmentSlots : equipSlots}];
			enemy.chosenEquipSet = 0;
		}
		if(sheet != null) {
			var mul = sheet.speciesMultiplier;
			if(mul != null) {
				var h = mul.attributesBase.h;
				var p_h = h;
				var p_keys = Object.keys(h);
				var p_length = p_keys.length;
				var p_current = 0;
				while(p_current < p_length) {
					var key = p_keys[p_current++];
					var p_key = key;
					var p_value = p_h[key];
					var mul = p_value;
					var value = enemy.attributesBase.h[p_key] * mul | 0;
					enemy.attributesBase.h[p_key] = value;
					enemy.attributesCalculated.h[p_key] = value;
				}
			}
			if(sheet.speciesAdd != null) {
				var h = sheet.speciesAdd.h;
				var p_h = h;
				var p_keys = Object.keys(h);
				var p_length = p_keys.length;
				var p_current = 0;
				while(p_current < p_length) {
					var key = p_keys[p_current++];
					var p_key = key;
					var p_value = p_h[key];
					var add = p_value;
					if(Object.prototype.hasOwnProperty.call(enemy.attributesBase.h,p_key) == false) {
						enemy.attributesBase.h[p_key] = add;
						enemy.attributesCalculated.h[p_key] = add;
					} else {
						var _g = p_key;
						var _g1 = enemy.attributesBase;
						var v = _g1.h[_g] + add;
						_g1.h[_g] = v;
						var _g2 = p_key;
						var _g3 = enemy.attributesCalculated;
						var v1 = _g3.h[_g2] + add;
						_g3.h[_g2] = v1;
					}
				}
			}
			if(sheet.speciesLevelStats != null) {
				var h = sheet.speciesLevelStats.attributesBase.h;
				var p_h = h;
				var p_keys = Object.keys(h);
				var p_length = p_keys.length;
				var p_current = 0;
				while(p_current < p_length) {
					var key = p_keys[p_current++];
					var p_key = key;
					var p_value = p_h[key];
					var addLevel = p_value;
					var value = enemy.attributesBase.h[p_key] + addLevel * enemyLevel | 0;
					enemy.attributesBase.h[p_key] = value;
					enemy.attributesCalculated.h[p_key] = value;
				}
			}
			if(sheet.initialBuff != null) {
				this.AddBuff(sheet.initialBuff,enemy);
			}
			if(sheet.viewAux >= 0) {
				enemy.viewAux = sheet.viewAux;
			}
			if(viewOverride >= 0) {
				enemy.viewAux = viewOverride;
			}
		}
		this.RecalculateAttributes(enemy);
		var v = enemy.attributesCalculated.h["LifeMax"];
		enemy.attributesCalculated.h["Life"] = v;
		return enemy;
	}
	,CreateAreaEnemy: function() {
		this.wdata.enemy = this.CreateEnemy(this.wdata.battleAreaRegion,this.wdata.battleArea);
	}
	,ReinitGameValues: function() {
		var _gthis = this;
		if(this.wdata.currency == null) {
			var _g = new haxe_ds_StringMap();
			_g.h["Lagrima"] = { value : 0, visible : false};
			_g.h["Lagrima Stone"] = { value : 0, visible : false};
			this.wdata.currency = { currencies : _g};
		}
		if(this.wdata.hero.equipmentSets == null) {
			this.wdata.hero.equipmentSets = [];
			this.wdata.hero.chosenEquipSet = 0;
		}
		if(this.wdata.hero.viewAux >= 0 == false) {
			this.wdata.hero.viewAux = 0;
		}
		while(this.wdata.hero.equipmentSets.length < 5) this.wdata.hero.equipmentSets.push({ equipmentSlots : [-1,-1,-1]});
		if(this.wdata.hero.equipment != null) {
			while(this.wdata.hero.equipment.indexOf(null) != -1) this.DiscardSingleEquipment(this.wdata.hero.equipment.indexOf(null));
			var _g_current = 0;
			var _g_array = this.wdata.hero.equipment;
			while(_g_current < _g_array.length) {
				var _g1_value = _g_array[_g_current];
				var _g1_key = _g_current++;
				var index = _g1_key;
				var value = _g1_value;
				if(value.outsideSystems == null) {
					value.outsideSystems = new haxe_ds_StringMap();
				}
				if(this.wdata.equipLevels == null) {
					this.wdata.equipLevels = [];
				}
				if(Object.prototype.hasOwnProperty.call(value.outsideSystems.h,"level") == false) {
					var index1 = ArrayHelper.InsertOnEmpty({ level : 0, limitbreak : 0, ascension : 0},this.wdata.equipLevels);
					value.outsideSystems.h["level"] = index1;
				}
			}
		}
		if(this.wdata.regionProgress == null) {
			this.wdata.regionProgress = [];
		}
		var _g = 0;
		var _g1 = this.wdata.regionProgress.length;
		while(_g < _g1) {
			var i = _g++;
			this.CheckRegionNull(i);
			var r = this.wdata.regionProgress[i];
			if(r.maxArea >= 1 == false) {
				r.maxArea = 1;
			}
			if(r.maxAreaOnPrestigeRecord == null) {
				r.maxAreaOnPrestigeRecord = [];
			}
		}
		if(this.wdata.maxArea >= 1 == false) {
			this.wdata.maxArea = 1;
		}
		if(this.wdata.battleAreaRegionMax >= 1 == false) {
			this.wdata.battleAreaRegionMax = 1;
		}
		if(this.wdata.prestigeTimes >= 0 == false) {
			this.wdata.prestigeTimes = 0;
		}
		if(this.wdata.hero.buffs != null == false) {
			this.wdata.hero.buffs = [];
		}
		if(this.wdata.hero.usableSkills != null == false) {
			this.wdata.hero.usableSkills = [];
		}
		if(this.wdata.enemy != null) {
			if(this.wdata.enemy.buffs != null == false) {
				this.wdata.enemy.buffs = [];
			}
		}
		var addAction = function(id,action,callback) {
			var w = _gthis.wdata;
			if(Object.prototype.hasOwnProperty.call(_gthis.wdata.playerActions.h,id) == false) {
				_gthis.wdata.playerActions.h[id] = action;
				if(callback != null) {
					var v = { actionData : w.playerActions.h[id], actualAction : callback};
					_gthis.playerActions.h[id] = v;
				}
			}
		};
		var createAction = function() {
			var a = { visible : false, enabled : false, mode : 0, timesUsed : 0};
			return a;
		};
		addAction("sleep",{ visible : false, enabled : false, timesUsed : 0, mode : 0},function(a) {
			_gthis.wdata.enemy = null;
			_gthis.wdata.sleeping = !_gthis.wdata.sleeping;
		});
		addAction("advance",{ visible : true, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("retreat",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("levelup",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("tabequipment",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("tabmemory",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("tabregion",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("tabcharacter",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("equipset_menu",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("equipset_battle",{ visible : false, enabled : false, timesUsed : 0, mode : 0},null);
		addAction("repeat",createAction(),function(a) {
			_gthis.wdata.killedInArea[_gthis.wdata.battleArea] = 0;
		});
		addAction("prestige",createAction(),function(a) {
			_gthis.PrestigeExecute();
		});
		var buttonId = 0;
		addAction("battleaction_" + 0,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[0];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 1;
		addAction("battleaction_" + 1,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[1];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 2;
		addAction("battleaction_" + 2,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[2];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 3;
		addAction("battleaction_" + 3,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[3];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 4;
		addAction("battleaction_" + 4,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[4];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 5;
		addAction("battleaction_" + 5,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[5];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var buttonId = 6;
		addAction("battleaction_" + 6,createAction(),function(struct) {
			var skill = _gthis.wdata.hero.usableSkills[6];
			_gthis.UseSkill(skill,_gthis.wdata.hero);
		});
		var _g = new haxe_ds_StringMap();
		_g.h["Life"] = 20;
		_g.h["LifeMax"] = 20;
		_g.h["Speed"] = 20;
		_g.h["SpeedCount"] = 0;
		_g.h["Attack"] = 1;
		_g.h["Defense"] = 0;
		_g.h["MagicAttack"] = 1;
		_g.h["MagicDefense"] = 0;
		_g.h["Piercing"] = 0;
		_g.h["Regen"] = 0;
		_g.h["enchant-fire"] = 0;
		_g.h["MP"] = 0;
		_g.h["MPMax"] = 100;
		_g.h["MPRecharge"] = 100;
		_g.h["MPRechargeCount"] = 10000;
		this.wdata.hero.attributesBase = _g;
		var valueXP = 0;
		if(this.wdata.hero.xp != null) {
			valueXP = this.wdata.hero.xp.value;
		}
		var timeLevelUpGrind = this.balancing.timeForFirstLevelUpGrind;
		var initialEnemyXP = 2;
		var initialXPToLevelUp = this.balancing.timeForFirstLevelUpGrind * initialEnemyXP / this.balancing.timeToKillFirstEnemy | 0;
		this.wdata.hero.xp = ResourceLogic.getExponentialResource(1.25,1,initialXPToLevelUp);
		this.wdata.hero.xp.value = valueXP;
		ResourceLogic.recalculateScalingResource(this.wdata.hero.level,this.wdata.hero.xp);
		this.areaBonus = ResourceLogic.getExponentialResource(1.05,1,initialXPToLevelUp * this.balancing.areaBonusXPPercentOfFirstLevelUp / 100 | 0);
		if(this.wdata.hero.equipment == null) {
			this.wdata.hero.equipment = [];
		}
		if(this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots == null) {
			this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots = [-1,-1,-1];
		}
		this.RecalculateAttributes(this.wdata.hero);
	}
	,PrestigeExecute: function() {
		this.prestiged = true;
		this.wdata.enemy = null;
		this.wdata.hero.level = 1;
		this.wdata.hero.xp.value = 0;
		var hero = this.wdata.hero;
		ResourceLogic.recalculateScalingResource(hero.level,hero.xp);
		var _g = 0;
		var _g1 = this.wdata.regionProgress.length;
		while(_g < _g1) {
			var i = _g++;
			this.wdata.regionProgress[i].maxAreaOnPrestigeRecord.push(this.wdata.regionProgress[i].maxArea);
			this.wdata.regionProgress[i].area = 0;
			this.wdata.regionProgress[i].maxArea = 1;
			this.wdata.regionProgress[i].amountEnemyKilledInArea = 0;
			this.wdata.killedInArea = [0];
		}
		this.wdata.battleAreaRegion = 0;
		this.wdata.battleArea = 0;
		this.wdata.maxArea = 1;
		this.wdata.battleAreaRegionMax = 1;
		this.wdata.prestigeTimes++;
		this.RecalculateAttributes(this.wdata.hero);
		var i = 0;
		while(i < this.wdata.hero.equipment.length) {
			var equipKept = false;
			var _g = 0;
			var _g1 = this.wdata.hero.equipmentSets.length;
			while(_g < _g1) {
				var j = _g++;
				if(this.wdata.hero.equipmentSets[j].equipmentSlots.indexOf(i) != -1) {
					var e = this.wdata.hero.equipment[i];
					if(e != null) {
						var reset = this.ResetEquipToBaseLevel(e,1);
						var tmp = reset == false;
						if(Object.prototype.hasOwnProperty.call(e.outsideSystems.h,"level")) {
							var levelId = e.outsideSystems.h["level"];
							if(levelId >= 0) {
								var el = this.wdata.equipLevels[levelId];
								el.ascension = 0;
								el.level = 0;
								el.limitbreak = 0;
							}
						}
					}
					equipKept = true;
					break;
				}
			}
			if(equipKept == false) {
				this.DiscardSingleEquipment(i);
				--i;
			}
			++i;
		}
	}
	,CheckRegionNull: function(region) {
		if(this.wdata.regionProgress[region] == null) {
			this.wdata.regionProgress[region] = { area : 0, maxArea : 1, amountEnemyKilledInArea : 0, maxAreaRecord : 1, maxAreaOnPrestigeRecord : []};
		}
	}
	,changeRegion: function(region) {
		this.wdata.battleAreaRegion = region;
		this.CheckRegionNull(region);
		this.ChangeBattleArea(this.wdata.regionProgress[region].area);
		this.wdata.maxArea = this.wdata.regionProgress[region].maxArea;
		this.wdata.killedInArea[this.wdata.battleArea] = this.wdata.regionProgress[region].amountEnemyKilledInArea;
	}
	,advance: function() {
		var hero = this.wdata.hero;
		var enemy = this.wdata.enemy;
		var killedInArea = this.wdata.killedInArea;
		var battleArea = this.wdata.battleArea;
		var areaComplete = killedInArea[battleArea] >= this.wdata.necessaryToKillInArea;
		var attackHappen = true;
		if(areaComplete) {
			this.wdata.enemy = null;
			attackHappen = false;
		}
		if(this.wdata.battleArea > 0 && this.PlayerFightMode() && areaComplete != true) {
			if(enemy == null) {
				this.CreateAreaEnemy();
				enemy = this.wdata.enemy;
				attackHappen = false;
			}
			if(enemy.attributesCalculated.h["Life"] <= 0) {
				attackHappen = false;
				this.CreateAreaEnemy();
			}
		}
		if(this.PlayerFightMode() == false || enemy == null) {
			attackHappen = false;
			var chargeMultiplier = 3;
			var max = 99999;
			var restMultiplier = 1;
			var valueK = "Life";
			var valueMaxK = "LifeMax";
			var value = this.wdata.hero.attributesCalculated.h[valueK];
			if(valueMaxK != null) {
				max = this.wdata.hero.attributesCalculated.h[valueMaxK];
			}
			value += max * 0.05 | 0;
			if(this.wdata.sleeping) {
				value += max * 0.3 | 0;
			}
			if(value > max) {
				value = max;
			}
			this.wdata.hero.attributesCalculated.h[valueK] = value;
		}
		var _g = 0;
		while(_g < 2) {
			var i = _g++;
			var actor = this.wdata.hero;
			if(i == 1) {
				actor = this.wdata.enemy;
			}
			if(actor == null) {
				continue;
			}
			var regen = actor.attributesCalculated.h["Regen"];
			if(regen > 0) {
				var recovery = regen * actor.attributesCalculated.h["LifeMax"] / 100;
				if(recovery < 1) {
					recovery = 1;
				}
				var _g1 = actor.attributesCalculated;
				var v = _g1.h["Life"] + (recovery | 0);
				_g1.h["Life"] = v;
			}
			if(actor.attributesCalculated.h["Life"] > actor.attributesCalculated.h["LifeMax"]) {
				var v1 = actor.attributesCalculated.h["LifeMax"];
				actor.attributesCalculated.h["Life"] = v1;
			}
		}
		if(attackHappen) {
			var attacker = null;
			var defender = null;
			var decided = false;
			attacker = hero;
			defender = enemy;
			var _g = 0;
			while(_g < 100) {
				var i = _g++;
				var bActor = hero;
				var _g1 = bActor.attributesCalculated;
				var v = _g1.h["SpeedCount"] + bActor.attributesCalculated.h["Speed"];
				_g1.h["SpeedCount"] = v;
				var sc = bActor.attributesCalculated.h["SpeedCount"];
				if(decided == false) {
					if(bActor.attributesCalculated.h["SpeedCount"] > 1000) {
						var v1 = bActor.attributesCalculated.h["SpeedCount"] - 1000;
						bActor.attributesCalculated.h["SpeedCount"] = v1;
						decided = true;
					}
				}
				var bActor1 = hero;
				bActor1 = enemy;
				var _g2 = bActor1.attributesCalculated;
				var v2 = _g2.h["SpeedCount"] + bActor1.attributesCalculated.h["Speed"];
				_g2.h["SpeedCount"] = v2;
				var sc1 = bActor1.attributesCalculated.h["SpeedCount"];
				if(decided == false) {
					if(bActor1.attributesCalculated.h["SpeedCount"] > 1000) {
						var v3 = bActor1.attributesCalculated.h["SpeedCount"] - 1000;
						bActor1.attributesCalculated.h["SpeedCount"] = v3;
						attacker = enemy;
						defender = hero;
						decided = true;
					}
				}
				if(decided) {
					break;
				}
			}
			if(attacker == this.wdata.hero && this.scheduledSkill != null) {
				this.UseSkill(this.scheduledSkill,attacker,true);
				this.scheduledSkill = null;
			} else {
				this.AttackExecute(attacker,defender);
			}
			if(attacker.turnRecharge != null) {
				var _g = 0;
				var _g1 = attacker.turnRecharge.length;
				while(_g < _g1) {
					var i = _g++;
					if(attacker.turnRecharge[i] > 0) {
						attacker.turnRecharge[i]--;
					}
				}
			}
			var _g = 0;
			var _g1 = attacker.buffs.length;
			while(_g < _g1) {
				var b = _g++;
				var bu = attacker.buffs[b];
				if(attacker.buffs[b] != null) {
					bu.duration -= 1;
				}
			}
			this.CheckRemoveMod(attacker);
			this.CheckRemoveMod(defender);
		} else if(this.wdata.hero.turnRecharge != null) {
			this.wdata.hero.turnRecharge.length = 0;
		}
		return "";
	}
	,CheckRemoveMod: function(actor) {
		var attackerBuffChanged = false;
		var _g = 0;
		var _g1 = actor.buffs.length;
		while(_g < _g1) {
			var b = _g++;
			var bu = actor.buffs[b];
			if(bu.duration <= 0) {
				attackerBuffChanged = true;
				actor.buffs[b] = null;
			}
		}
		while(HxOverrides.remove(actor.buffs,null)) {
		}
		if(attackerBuffChanged) {
			this.RecalculateAttributes(actor);
		}
	}
	,AddMod: function(modBase,statAdd,statMul,seed) {
		var mulAdd = modBase.statMultipliers;
		var rand = this.fixedRandom;
		rand.set_seed(seed);
		if(mulAdd != null) {
			var h = mulAdd.h;
			var m_h = h;
			var m_keys = Object.keys(h);
			var m_length = m_keys.length;
			var m_current = 0;
			while(m_current < m_length) {
				var key = m_keys[m_current++];
				var m_key = key;
				var m_value = m_h[key];
				var val = RandomExtender.Range(rand,mulAdd.h[m_key]);
				if(Object.prototype.hasOwnProperty.call(statMul.h,m_key)) {
					var v = statMul.h[m_key] * val / 100 | 0;
					statMul.h[m_key] = v;
				} else {
					statMul.h[m_key] = val;
				}
			}
		}
		if(modBase.statAdds != null) {
			var h = modBase.statAdds.h;
			var m_h = h;
			var m_keys = Object.keys(h);
			var m_length = m_keys.length;
			var m_current = 0;
			while(m_current < m_length) {
				var key = m_keys[m_current++];
				var m_key = key;
				var m_value = m_h[key];
				var val = RandomExtender.Range(rand,modBase.statAdds.h[m_key]);
				if(Object.prototype.hasOwnProperty.call(statAdd.h,m_key)) {
					var v = statAdd.h[m_key] + val | 0;
					statAdd.h[m_key] = v;
				} else {
					statAdd.h[m_key] = val;
				}
			}
		}
	}
	,LimitBreakEquipment: function(pos) {
		var e = this.wdata.hero.equipment[pos];
		BattleManager.LimitBreak(e,this.wdata);
	}
	,ChangeEquipmentSet: function(pos) {
		this.wdata.hero.chosenEquipSet = pos;
		this.RecalculateAttributes(this.wdata.hero);
	}
	,UpgradeOrLimitBreakEquipment: function(pos) {
		var e = this.wdata.hero.equipment[pos];
		if(BattleManager.IsUpgradable(e,this.wdata)) {
			BattleManager.Upgrade(e,this.wdata,this);
		} else {
			BattleManager.LimitBreak(e,this.wdata);
		}
		this.RecalculateAttributes(this.wdata.hero);
	}
	,DiscardSingleEquipment: function(pos) {
		var e = this.wdata.hero.equipment[pos];
		HxOverrides.remove(this.wdata.hero.equipment,e);
		var _g = 0;
		var _g1 = this.wdata.hero.equipmentSets.length;
		while(_g < _g1) {
			var j = _g++;
			var _g2 = 0;
			var _g3 = this.wdata.hero.equipmentSets[j].equipmentSlots.length;
			while(_g2 < _g3) {
				var i = _g2++;
				if(this.wdata.hero.equipmentSets[j].equipmentSlots[i] >= pos) {
					this.wdata.hero.equipmentSets[j].equipmentSlots[i]--;
				}
			}
		}
		if(e != null) {
			this.equipmentToDiscard.push(e);
		}
	}
	,SellSingleEquipment: function(pos) {
		var prize = BattleManager.GetSellPrize(this.wdata.hero.equipment[pos],this.wdata);
		this.DiscardSingleEquipment(pos);
		this.wdata.currency.currencies.h["Lagrima"].value += prize;
	}
	,SellEquipment: function(pos) {
		this.SellSingleEquipment(pos);
		this.RecalculateAttributes(this.wdata.hero);
	}
	,ToggleEquipped: function(pos) {
		var slot = this.wdata.hero.equipment[pos].type;
		if(this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots[slot] == pos) {
			if(slot != 2) {
				this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots[slot] = -1;
			}
		} else {
			this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots[slot] = pos;
		}
		this.RecalculateAttributes(this.wdata.hero);
	}
	,IsEquipped: function(pos,anySet) {
		if(anySet == null) {
			anySet = true;
		}
		if(anySet) {
			var _g = 0;
			var _g1 = this.wdata.hero.equipmentSets.length;
			while(_g < _g1) {
				var i = _g++;
				if(this.wdata.hero.equipmentSets[i].equipmentSlots.indexOf(pos) != -1) {
					return true;
				}
			}
			return false;
		} else {
			return this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots.indexOf(pos) != -1;
		}
	}
	,AddEvent: function(eventType) {
		var e = new GameEvent(eventType);
		this.events.push(e);
		return e;
	}
	,BaseInformationFormattedString: function() {
		var hero = this.wdata.hero;
		var maxArea = this.wdata.maxArea;
		var battleArea = this.wdata.battleArea;
		var enemy = this.wdata.enemy;
		var level = hero.level;
		var xp = hero.xp.value;
		var xpmax = hero.xp.calculatedMax;
		var baseInfo = this.CharacterBaseInfoFormattedString(hero);
		var areaText = "";
		var battleAreaShow = battleArea + 1;
		var maxAreaShow = maxArea + 1;
		if(maxArea > 0) {
			areaText = "Area: " + battleAreaShow + " / " + maxAreaShow;
		}
		var output = "" + areaText + "\r\n\r\n\n\nPlayer \r\n\tlevel: " + level + "\r\n\txp: " + xp + " / " + xpmax + "\r\n" + baseInfo;
		baseInfo = this.CharacterBaseInfoFormattedString(enemy);
		output += "\n\n";
		output += "Enemy\r\n" + baseInfo;
		return output;
	}
	,CharacterBaseInfoFormattedString: function(actor) {
		var life = actor.attributesCalculated.h["Life"];
		var lifeM = actor.attributesCalculated.h["LifeMax"];
		var attack = actor.attributesCalculated.h["Attack"];
		return "\t Life: " + life + " / " + lifeM + "\r\n\tAttack: " + attack;
	}
	,update: function(delta) {
		this.wdata.timeCount += delta;
		this.RefreshCalculatedTurnOrder();
		var _g = 0;
		var _g1 = this.equipmentToDiscard;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.outsideSystems != null) {
				if(Object.prototype.hasOwnProperty.call(e.outsideSystems.h,"skillset")) {
					var skillsetpos = e.outsideSystems.h["skillset"];
					this.wdata.skillSets[skillsetpos] = null;
				}
				if(Object.prototype.hasOwnProperty.call(e.outsideSystems.h,"level")) {
					var level = e.outsideSystems.h["level"];
					this.wdata.equipLevels[level] = null;
				}
			}
		}
		this.equipmentToDiscard.length = 0;
		if(this.wdata.regionProgress == null) {
			this.wdata.regionProgress = [];
		}
		while(this.wdata.regionProgress.length <= this.wdata.battleAreaRegion) this.wdata.regionProgress.push({ area : -1, maxArea : -1, amountEnemyKilledInArea : -1, maxAreaRecord : -1, maxAreaOnPrestigeRecord : []});
		this.wdata.regionProgress[this.wdata.battleAreaRegion].area = this.wdata.battleArea;
		var recalculate = false;
		if(this.wdata.regionProgress[this.wdata.battleAreaRegion].maxArea != this.wdata.maxArea) {
			recalculate = true;
			this.wdata.regionProgress[this.wdata.battleAreaRegion].maxArea = this.wdata.maxArea;
		}
		var _g = 0;
		var _g1 = this.wdata.regionProgress;
		while(_g < _g1.length) {
			var rp = _g1[_g];
			++_g;
			if(rp != null) {
				if(rp.maxArea > rp.maxAreaRecord) {
					rp.maxAreaRecord = rp.maxArea;
					recalculate = true;
				}
			}
		}
		if(recalculate) {
			this.RecalculateAttributes(this.wdata.hero);
		}
		this.wdata.regionProgress[this.wdata.battleAreaRegion].amountEnemyKilledInArea = this.wdata.killedInArea[this.wdata.battleArea];
		if(this.regionRequirements.length >= this.wdata.battleAreaRegionMax) {
			var maxArea = this.wdata.regionProgress[0].maxArea;
			if(maxArea > this.regionRequirements[this.wdata.battleAreaRegionMax]) {
				this.wdata.battleAreaRegionMax++;
				this.AddEvent(EventTypes.RegionUnlock).data = this.wdata.battleAreaRegionMax - 1;
			}
		}
		this.canAdvance = this.wdata.battleArea < this.wdata.maxArea;
		this.canRetreat = this.wdata.battleArea > 0;
		this.canLevelUp = this.wdata.hero.xp.value >= this.wdata.hero.xp.calculatedMax && this.wdata.hero.level < this.CalculateHeroMaxLevel();
		var hasEquipment = this.wdata.hero.equipment.length > 1;
		var lu = this.wdata.playerActions.h["tabequipment"];
		lu.enabled = hasEquipment;
		lu.visible = lu.enabled || lu.visible;
		var lu = this.wdata.playerActions.h["tabregion"];
		lu.enabled = true;
		lu.visible = this.wdata.battleAreaRegionMax > 1 || lu.visible;
		var lu = this.wdata.playerActions.h["tabcharacter"];
		lu.enabled = true;
		lu.visible = this.canLevelUp || lu.visible || this.wdata.hero.level > 1;
		var lu = this.wdata.playerActions.h["equipset_menu"];
		lu.enabled = true;
		lu.visible = this.wdata.hero.equipment.length > 10 || lu.visible;
		var lu = this.wdata.playerActions.h["equipset_battle"];
		lu.enabled = true;
		lu.visible = this.wdata.hero.equipment.length > 10 || lu.visible;
		var lu = this.wdata.playerActions.h["levelup"];
		lu.enabled = this.canLevelUp;
		lu.visible = this.canLevelUp || lu.visible;
		var lu = this.wdata.playerActions.h["prestige"];
		lu.enabled = this.wdata.hero.level >= this.GetLevelRequirementForPrestige();
		lu.visible = lu.enabled || lu.visible;
		var _g = 0;
		while(_g < 7) {
			var i = _g++;
			var buttonId = i;
			var lu = this.wdata.playerActions.h["battleaction_" + i];
			var skillUsable = false;
			var skillVisible = false;
			var skillButtonMode = 0;
			if(this.wdata.hero.level < this.skillSlotUnlocklevel[i]) {
				skillButtonMode = 1;
			}
			if(this.wdata.hero.usableSkills[i] != null) {
				if(this.wdata.hero.level >= this.skillSlotUnlocklevel[i]) {
					if(this.wdata.hero.attributesCalculated.h["MPRechargeCount"] >= 10000) {
						skillUsable = true;
					}
				}
				if(i == 0 || this.wdata.hero.level >= this.skillSlotUnlocklevel[i - 1]) {
					skillVisible = true;
				}
				var sb = this.GetSkillBase(this.wdata.hero.usableSkills[i].id);
				if(sb.turnRecharge > 0) {
					if(this.wdata.hero.turnRecharge == null) {
						this.wdata.hero.turnRecharge = [];
					}
					if(this.wdata.hero.turnRecharge[i] > 0) {
						skillUsable = false;
					}
				}
				if(skillUsable && skillVisible && (this.wdata.enemy == null || this.wdata.enemy.attributesCalculated.h["Life"] == 0)) {
					var efs = sb.effects;
					if(efs == null) {
						efs = sb.activeEffect;
					}
					var _g1 = 0;
					while(_g1 < efs.length) {
						var e = efs[_g1];
						++_g1;
						if(e.target == Target.ENEMY) {
							skillUsable = false;
							break;
						}
					}
				}
			}
			if(this.scheduledSkill != null) {
				skillUsable = false;
				if(this.scheduledSkill == this.wdata.hero.usableSkills[i]) {
					skillButtonMode = 2;
				}
			}
			lu.enabled = skillUsable;
			lu.visible = skillVisible;
			lu.mode = skillButtonMode;
		}
		var lu = this.wdata.playerActions.h["advance"];
		lu.visible = this.canAdvance || lu.visible;
		lu.enabled = this.canAdvance;
		var lu = this.wdata.playerActions.h["retreat"];
		lu.enabled = this.canRetreat;
		lu.visible = lu.enabled || lu.visible;
		var lu = this.wdata.playerActions.h["repeat"];
		lu.enabled = this.wdata.maxArea > this.wdata.battleArea && this.wdata.killedInArea[this.wdata.battleArea] > 0;
		lu.visible = lu.enabled || lu.visible;
		var lu = this.wdata.playerActions.h["sleep"];
		if(this.wdata.sleeping == true) {
			lu.mode = 1;
			lu.enabled = true;
		} else {
			lu.mode = 0;
			lu.enabled = this.wdata.hero.attributesCalculated.h["Life"] < this.wdata.hero.attributesCalculated.h["LifeMax"] && this.wdata.recovering == false;
		}
		lu.visible = lu.enabled || lu.visible;
		if(this.wdata.recovering && this.wdata.hero.attributesCalculated.h["Life"] >= this.wdata.hero.attributesCalculated.h["LifeMax"]) {
			var v = this.wdata.hero.attributesCalculated.h["LifeMax"];
			this.wdata.hero.attributesCalculated.h["Life"] = v;
			this.wdata.recovering = false;
		}
		var mrc = this.wdata.hero.attributesCalculated.h["MPRechargeCount"];
		if(mrc < 10000) {
			mrc += this.wdata.hero.attributesCalculated.h["MPRecharge"] * delta * 5 | 0;
			this.wdata.hero.attributesCalculated.h["MPRechargeCount"] = mrc;
			if(mrc >= 10000) {
				var v = this.wdata.hero.attributesCalculated.h["MPMax"];
				this.wdata.hero.attributesCalculated.h["MP"] = v;
			}
		}
		if(this.wdata.timeCount >= this.timePeriod) {
			this.wdata.timeCount = 0;
			return this.advance();
		}
		if(this.dirty) {
			this.dirty = false;
		}
		return null;
	}
	,DefaultConfiguration: function() {
	}
	,getPlayerTimesKilled: function() {
		return this.wdata.playerTimesKilled;
	}
	,RetreatArea: function() {
		if(this.wdata.battleArea > 0) {
			this.ChangeBattleArea(this.wdata.battleArea - 1);
		}
	}
	,LevelUp: function() {
		if(this.canLevelUp) {
			this.ForceLevelUp();
		}
	}
	,ForceLevelUp: function() {
		var hero = this.wdata.hero;
		hero.xp.value -= hero.xp.calculatedMax;
		hero.level++;
		this.AddEvent(EventTypes.ActorLevelUp);
		this.RecalculateAttributes(hero);
		ResourceLogic.recalculateScalingResource(hero.level,hero.xp);
		var v = hero.attributesCalculated.h["LifeMax"];
		hero.attributesCalculated.h["Life"] = v;
		var v = hero.attributesCalculated.h["MPMax"];
		hero.attributesCalculated.h["MP"] = v;
		hero.attributesCalculated.h["MPRechargeCount"] = 10000;
	}
	,GetRegionBonusLevel: function(i) {
		this.CheckRegionNull(i);
		var prize = this.regionPrizes[i];
		var pro = this.wdata.regionProgress[i];
		var bonusLevel = 0;
		if(prize.statBonus != null) {
			if(pro.maxArea >= 2) {
				bonusLevel += pro.maxArea - 1;
			}
			var _g = 0;
			var _g1 = pro.maxAreaOnPrestigeRecord;
			while(_g < _g1.length) {
				var maxAreaPrestiges = _g1[_g];
				++_g;
				if(maxAreaPrestiges >= 2) {
					bonusLevel += maxAreaPrestiges - 1;
				}
			}
			return bonusLevel;
		}
		return -1;
	}
	,RecalculateAttributes: function(actor,equipCalculation,buffCalculation) {
		if(buffCalculation == null) {
			buffCalculation = true;
		}
		if(equipCalculation == null) {
			equipCalculation = true;
		}
		var _g = 0;
		var _g1 = this.volatileAttributeList.length;
		while(_g < _g1) {
			var i = _g++;
			this.volatileAttributeAux[i] = actor.attributesCalculated.h[this.volatileAttributeList[i]];
			if(this.volatileAttributeAux[i] >= 0 == false) {
				this.volatileAttributeAux[i] = 0;
			}
		}
		if(actor == this.wdata.hero) {
			var skillSetPos = this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots[2];
			if(skillSetPos >= 0) {
				var e = this.wdata.hero.equipment[skillSetPos];
				if(e != null && e.type == 2) {
					var skillSet = this.wdata.skillSets[e.outsideSystems.h["skillset"]];
					this.wdata.hero.usableSkills = skillSet.skills;
				}
			}
		}
		if(actor.attributesBase == actor.attributesCalculated) {
			actor.attributesCalculated = new haxe_ds_StringMap();
		}
		actor.attributesCalculated.h = Object.create(null);
		if(actor == this.wdata.hero) {
			var actor1 = actor.attributesBase;
			var _g = new haxe_ds_StringMap();
			_g.h["Attack"] = 1;
			_g.h["LifeMax"] = 5;
			_g.h["Life"] = 5;
			_g.h["Speed"] = 0;
			_g.h["Defense"] = 0;
			_g.h["MagicAttack"] = 1;
			_g.h["MagicDefense"] = 0;
			_g.h["SpeedCount"] = 0;
			_g.h["Piercing"] = 0;
			_g.h["MPMax"] = 2;
			AttributeLogic.Add(actor1,_g,actor.level,actor.attributesCalculated);
		} else {
			var h = actor.attributesBase.h;
			var _g2_h = h;
			var _g2_keys = Object.keys(h);
			var _g2_length = _g2_keys.length;
			var _g2_current = 0;
			while(_g2_current < _g2_length) {
				var key = _g2_keys[_g2_current++];
				var _g3_key = key;
				var _g3_value = _g2_h[key];
				var key1 = _g3_key;
				var value = _g3_value;
				actor.attributesCalculated.h[key1] = value;
			}
		}
		if(actor == this.wdata.hero) {
			var _g = 0;
			var _g1 = this.wdata.regionProgress.length;
			while(_g < _g1) {
				var i = _g++;
				var bonusLevel = this.GetRegionBonusLevel(i);
				if(bonusLevel > 0) {
					var prize = this.regionPrizes[i];
					AttributeLogic.Add(actor.attributesCalculated,prize.statBonus,bonusLevel,actor.attributesCalculated);
				}
			}
		}
		if(equipCalculation) {
			if(actor.equipmentSets != null) {
				if(actor.equipmentSets[actor.chosenEquipSet].equipmentSlots != null) {
					var _g = 0;
					var _g1 = actor.equipmentSets[actor.chosenEquipSet].equipmentSlots;
					while(_g < _g1.length) {
						var es = _g1[_g];
						++_g;
						var e = actor.equipment[es];
						if(e != null) {
							AttributeLogic.Add(actor.attributesCalculated,e.attributes,1,actor.attributesCalculated);
						}
					}
				}
			}
		}
		if(buffCalculation) {
			var _g = 0;
			var _g1 = actor.buffs;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				if(b.addStats != null) {
					AttributeLogic.Add(actor.attributesCalculated,b.addStats,1,actor.attributesCalculated);
				}
			}
		}
		if(equipCalculation) {
			if(actor.equipmentSets != null) {
				if(actor.equipmentSets[actor.chosenEquipSet].equipmentSlots != null) {
					var _g = 0;
					var _g1 = actor.equipmentSets[actor.chosenEquipSet].equipmentSlots;
					while(_g < _g1.length) {
						var es = _g1[_g];
						++_g;
						var e = actor.equipment[es];
						if(e != null) {
							if(e.attributeMultiplier != null) {
								var h = e.attributeMultiplier.h;
								var a_h = h;
								var a_keys = Object.keys(h);
								var a_length = a_keys.length;
								var a_current = 0;
								while(a_current < a_length) {
									var key = a_keys[a_current++];
									var a_key = key;
									var a_value = a_h[key];
									var v = actor.attributesCalculated.h[a_key] * a_value / 100 | 0;
									actor.attributesCalculated.h[a_key] = v;
								}
							}
						}
					}
				}
			}
		}
		if(buffCalculation) {
			var _g = 0;
			var _g1 = actor.buffs;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				if(b.mulStats != null) {
					var h = b.mulStats.h;
					var a_h = h;
					var a_keys = Object.keys(h);
					var a_length = a_keys.length;
					var a_current = 0;
					while(a_current < a_length) {
						var key = a_keys[a_current++];
						var a_key = key;
						var a_value = a_h[key];
						var v = actor.attributesCalculated.h[a_key] * a_value / 100 | 0;
						actor.attributesCalculated.h[a_key] = v;
					}
				}
			}
		}
		var _g = 0;
		var _g1 = this.volatileAttributeList.length;
		while(_g < _g1) {
			var i = _g++;
			var v = this.volatileAttributeAux[i];
			actor.attributesCalculated.h[this.volatileAttributeList[i]] = v;
		}
	}
	,AdvanceArea: function() {
		this.ChangeBattleArea(this.wdata.battleArea + 1);
	}
	,DiscardWorseEquipment: function() {
		var i = 0;
		var times = 0;
		while(i < this.wdata.hero.equipment.length) {
			++times;
			if(times > 500) {
				console.log("Sources\GRI\logic/BattleManager.hx:2158:","LOOP SCAPE");
				break;
			}
			var e = this.wdata.hero.equipment[i];
			if(e == null) {
				++i;
				continue;
			}
			if(e.type == 2) {
				++i;
				continue;
			}
			var j = i + 1;
			var times2 = 0;
			while(j < this.wdata.hero.equipment.length) {
				++times2;
				if(times2 > 500) {
					console.log("Sources\GRI\logic/BattleManager.hx:2175:","LOOP SCAPE 2");
					break;
				}
				var e2 = this.wdata.hero.equipment[j];
				if(e2 == null) {
					++j;
					continue;
				}
				if(e.type != e2.type) {
					++j;
					continue;
				}
				var r = this.CompareEquipmentStrength(e,e2);
				if(r == 1 || r == 0) {
					if(this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots.indexOf(j) != -1) {
						++j;
						continue;
					}
					this.SellSingleEquipment(j);
					continue;
				}
				if(r == 2) {
					if(this.wdata.hero.equipmentSets[this.wdata.hero.chosenEquipSet].equipmentSlots.indexOf(i) != -1) {
						++j;
						continue;
					}
					this.SellSingleEquipment(i);
					--i;
					break;
				}
				++j;
			}
			++i;
		}
	}
	,CompareEquipmentStrength: function(e1,e2) {
		var e1Superior = 0;
		var e2Superior = 0;
		var mapAttr1 = e1.attributes;
		var mapAttr2 = e2.attributes;
		var h = mapAttr1.h;
		var attrKey_h = h;
		var attrKey_keys = Object.keys(h);
		var attrKey_length = attrKey_keys.length;
		var attrKey_current = 0;
		while(attrKey_current < attrKey_length) {
			var attrKey = attrKey_keys[attrKey_current++];
			if(Object.prototype.hasOwnProperty.call(mapAttr2.h,attrKey)) {
				if(mapAttr1.h[attrKey] > mapAttr2.h[attrKey]) {
					e1Superior = 1;
				}
				if(mapAttr1.h[attrKey] < mapAttr2.h[attrKey]) {
					e2Superior = 1;
				}
			} else {
				e1Superior = 1;
			}
			if(e1Superior == 1 && e2Superior == 1) {
				return -1;
			}
		}
		var h = mapAttr2.h;
		var attrKey_h = h;
		var attrKey_keys = Object.keys(h);
		var attrKey_length = attrKey_keys.length;
		var attrKey_current = 0;
		while(attrKey_current < attrKey_length) {
			var attrKey = attrKey_keys[attrKey_current++];
			if(Object.prototype.hasOwnProperty.call(mapAttr1.h,attrKey)) {
				if(mapAttr1.h[attrKey] > mapAttr2.h[attrKey]) {
					e1Superior = 1;
				}
				if(mapAttr1.h[attrKey] < mapAttr2.h[attrKey]) {
					e2Superior = 1;
				}
			} else {
				e2Superior = 1;
			}
			if(e1Superior == 1 && e2Superior == 1) {
				return -1;
			}
		}
		var mapAttr1 = e1.attributeMultiplier;
		var mapAttr2 = e2.attributeMultiplier;
		if(mapAttr1 != null || mapAttr2 != null) {
			if(mapAttr2 == null) {
				mapAttr2 = new haxe_ds_StringMap();
			}
			if(mapAttr1 == null) {
				mapAttr1 = new haxe_ds_StringMap();
			}
			var h = mapAttr1.h;
			var attrKey_h = h;
			var attrKey_keys = Object.keys(h);
			var attrKey_length = attrKey_keys.length;
			var attrKey_current = 0;
			while(attrKey_current < attrKey_length) {
				var attrKey = attrKey_keys[attrKey_current++];
				if(Object.prototype.hasOwnProperty.call(mapAttr2.h,attrKey)) {
					if(mapAttr1.h[attrKey] > mapAttr2.h[attrKey]) {
						e1Superior = 1;
					}
					if(mapAttr1.h[attrKey] < mapAttr2.h[attrKey]) {
						e2Superior = 1;
					}
				} else {
					if(mapAttr1.h[attrKey] > 100) {
						e1Superior = 1;
					}
					if(mapAttr1.h[attrKey] < 100) {
						e2Superior = 1;
					}
				}
				if(e1Superior == 1 && e2Superior == 1) {
					return -1;
				}
			}
			var h = mapAttr2.h;
			var attrKey_h = h;
			var attrKey_keys = Object.keys(h);
			var attrKey_length = attrKey_keys.length;
			var attrKey_current = 0;
			while(attrKey_current < attrKey_length) {
				var attrKey = attrKey_keys[attrKey_current++];
				if(Object.prototype.hasOwnProperty.call(mapAttr1.h,attrKey)) {
					if(mapAttr1.h[attrKey] > mapAttr2.h[attrKey]) {
						e1Superior = 1;
					}
					if(mapAttr1.h[attrKey] < mapAttr2.h[attrKey]) {
						e2Superior = 1;
					}
				} else {
					if(mapAttr2.h[attrKey] > 100) {
						e2Superior = 1;
					}
					if(mapAttr2.h[attrKey] < 100) {
						e1Superior = 1;
					}
				}
				if(e1Superior == 1 && e2Superior == 1) {
					return -1;
				}
			}
		}
		if(e1Superior == 1 && e2Superior == 0) {
			return 1;
		}
		if(e1Superior == 0 && e2Superior == 1) {
			return 2;
		}
		return 0;
	}
	,GetJsonPersistentData: function() {
		return JSON.stringify(this.wdata);
	}
	,SendJsonPersistentData: function(jsonString) {
		var loadedWdata = JSON.parse(jsonString);
		if(loadedWdata.worldVersion < 301) {
			loadedWdata.worldVersion = this.wdata.worldVersion;
			loadedWdata.sleeping = loadedWdata.sleeping == true;
		}
		if(loadedWdata.worldVersion >= 601 == false) {
			loadedWdata.regionProgress = [];
			loadedWdata.regionProgress.push({ area : loadedWdata.battleArea, maxArea : loadedWdata.maxArea, amountEnemyKilledInArea : loadedWdata.killedInArea[loadedWdata.battleArea], maxAreaRecord : loadedWdata.maxArea, maxAreaOnPrestigeRecord : []});
			loadedWdata.battleAreaRegion = 0;
			loadedWdata.battleArea = 0;
		}
		if(loadedWdata.worldVersion != this.wdata.worldVersion) {
			loadedWdata.enemy = null;
		}
		loadedWdata.worldVersion = this.wdata.worldVersion;
		this.wdata = loadedWdata;
		if(this.wdata.battleArea >= this.wdata.killedInArea.length) {
			this.wdata.battleArea = this.wdata.killedInArea.length - 1;
		}
		if(this.wdata.maxArea >= this.wdata.killedInArea.length) {
			this.wdata.maxArea = this.wdata.killedInArea.length - 1;
		}
		this.ReinitGameValues();
	}
	,__class__: BattleManager
};
var CrossTarget = function() { };
CrossTarget.__name__ = "CrossTarget";
CrossTarget.OpenURL = function(url) {
	window.open(url, '_blank');
};
CrossTarget.reload = function() {
	$global.location.reload();
};
CrossTarget.downloadFile = function(filename,text) {
	
        download('bla', 'blu');
    ;
};
CrossTarget.GetLocalStorageItem = function(key) {
	return js_Browser.getLocalStorage().getItem(key);
};
CrossTarget.SetLocalStorageItem = function(key,value) {
	CrossTarget.latestSave = value;
	js_Browser.getLocalStorage().setItem(key,value);
	return "";
};
CrossTarget.resetLocalStorage = function(key) {
	CrossTarget.SetLocalStorageItem(key,"");
};
var FileAccessJS = function() { };
FileAccessJS.__name__ = "FileAccessJS";
FileAccessJS.createImportElement = function() {
	FileAccessJS.element = window.document.createElement("div");
	var style = "";
	FileAccessJS.element.innerHTML = "<div id ='saveimport' class='saveelement' style = " + style + ">Import Save: <input id='import__' type='file'></input></div>";
	FileAccessJS.element.style.top = "80%";
	FileAccessJS.element.style.left = "30px";
	FileAccessJS.element.style.position = "fixed";
	console.log("Sources\JS/FileAccess.hx:18:",FileAccessJS.element.innerHTML);
	window.document.body.appendChild(FileAccessJS.element);
};
FileAccessJS.feedSave = function(saveDataContent) {
	if(FileAccessJS.elementExport == null) {
		FileAccessJS.elementExport = window.document.createElement("div");
		window.document.body.appendChild(FileAccessJS.elementExport);
		var element = FileAccessJS.elementExport;
		element.style.top = "85%";
		element.style.left = "30px";
		element.style.position = "fixed";
		element.className = "saveelement";
	}
	var ht = "<a href='data:text/plain;charset=utf-8,";
	ht += saveDataContent;
	ht += "' download='savedata.json'>Export save data</a>";
	FileAccessJS.elementExport.innerHTML = ht;
};
FileAccessJS.saveImportVisibility = function(visible) {
	if(FileAccessJS.element != null) {
		if(visible) {
			FileAccessJS.element.style.visibility = "visible";
		} else {
			FileAccessJS.element.style.visibility = "hidden";
		}
	}
	if(FileAccessJS.elementExport != null) {
		if(visible) {
			FileAccessJS.elementExport.style.visibility = "visible";
		} else {
			FileAccessJS.elementExport.style.visibility = "hidden";
		}
	}
};
var FileUtilities = function() { };
FileUtilities.__name__ = "FileUtilities";
FileUtilities.GetFetchTextContent = function() {
	var fileText = fetchTextContent;
	if(fileText != "") {
		fetchTextContent = "";
	}
	return fileText;
};
FileUtilities.ReadFile = function(file,callback) {
	var fReader = new FileReader();
	fReader.readAsDataURL(file);
	fReader.onloadend = function(event) {
		console.log("Sources\JS/FileReader.hx:23:",event.target.result);
		console.log("Sources\JS/FileReader.hx:24:",event.target.value);
		var content = event.target.result;
		var string = event.target.result;
		if(string.indexOf("data:application/json;base64,") != -1) {
			var savedata = haxe_crypto_Base64.decode(HxOverrides.substr(string,"data:application/json;base64,".length,null));
			callback(savedata.toString());
		}
	};
};
var GRIControl = function() {
	this.lagrimaAreaPrefix = [null,null,null,null,null,"Fire","Ice","Thunder"];
	this.debuffIconDefault = Sprite.create("arrowdown",15,22);
	this.buffIconDefault = Sprite.create("arrowup",15,22);
	var _g = new haxe_ds_StringMap();
	var value = Sprite.create("leaf",21,21);
	_g.h["regen"] = value;
	var value = Sprite.create("shield",15,15);
	_g.h["protect"] = value;
	var value = Sprite.create("boot",21,15);
	_g.h["haste"] = value;
	this.buffToIcon = _g;
	this.lagrimaAreaLabels = ["Forest","Streets","Mountain","Seaside","Wild Plains","Inactive Volcano","Snow Fields","Thunder Roads"];
	var _g = new haxe_ds_StringMap();
	_g.h["regen"] = "Slowly recovers HP";
	_g.h["enchant-fire"] = "Adds fire element and makes attacks magical";
	_g.h["protect"] = "Increases defense";
	_g.h["haste"] = "Increases speed";
	_g.h["nap"] = "Resting to recover HP";
	_g.h["pierce"] = "Increases armor piercing power";
	_g.h["noblesse"] = "Increases damage as long as not hit";
	this.buffToExplanation = _g;
	var _g = new haxe_ds_StringMap();
	_g.h["Fogo"] = "Deals fire damage";
	_g.h["Gelo"] = "Deals ice damage";
	_g.h["Raio"] = "Deals thunder damage";
	_g.h["DeSpell"] = "Removes enemy buffs";
	_g.h["Cure"] = "Heals wounds";
	_g.h["Haste"] = "Increases speed";
	_g.h["Bloodlust"] = "Increases the power of Blood";
	_g.h["Noblesse"] = "Increases damage as long as not hit";
	_g.h["Sharpen"] = "Increases armor piercing power";
	_g.h["Armor Break"] = "Decreases enemy defense";
	_g.h["Attack Break"] = "Decreases enemy attack";
	_g.h["Protect"] = "Increases defense";
	_g.h["Regen"] = "Slowly recovers HP";
	_g.h["Light Slash"] = "Deals light damage";
	_g.h["Slash"] = "Deals damage";
	_g.h["Heavy Slash"] = "deals heavy damage";
	this.SkillToExplanation = _g;
	this.enemyLabels = [["Goblin","Dog","Giant","Turtle"],["Wolf"],["Tonberry"],["Adamanstoise"],["Cactuar"],["Reaper"],["Witchhunter"],["Buff Witch"],["Witchkiller"]];
	this.eventsShown = 0;
	this.gameStartedAfterTitle = false;
	this.areaNames = [];
	this.eventToWarning = new haxe_ds_StringMap();
	this.eventToAction = new haxe_ds_StringMap();
	this.turnOrderView = new TurnOrderView();
	this.view = new GRIView();
	this.battleManager = new BattleManager();
	var bm = this.battleManager;
	bm.ForceSkillSetDrop(-1,null,{ skills : [{ id : "Slash", level : 1},{ id : "Cure", level : 1},{ id : "Protect", level : 3}]},false);
	bm.wdata.hero.equipmentSets[bm.wdata.hero.chosenEquipSet].equipmentSlots[2] = 0;
	this.genericWarning = { title : "Warning", description : "Warning Description", buttonYes : "Close", buttonFalse : null};
	this.equipControl = new GRIControlEquip(bm,this);
	this.regionControl = new GRIControlRegion(this,bm);
	this.titleControl = new GRIControlTitle(bm);
	this.turnOrderView.layoutId = "turnorder";
	var proto = new PrototypeItemMaker();
	proto.MakeItems();
	bm.itemBases = proto.items;
	bm.modBases = proto.mods;
	var proto = new PrototypeSkillMaker();
	proto.init();
	bm.skillBases = proto.skills;
	var jsonData = CrossTarget.GetLocalStorageItem(GRIControl.key);
	var persistenceMaster = SaveAssistant.GetPersistenceMaster(jsonData);
	var jsonData2 = persistenceMaster.jsonStory;
	var tmp = jsonData2 != null && jsonData2 != "";
	if(persistenceMaster.jsonGameplay != null) {
		bm.SendJsonPersistentData(persistenceMaster.jsonGameplay);
	}
};
GRIControl.__name__ = "GRIControl";
GRIControl.refreshAreaName = function(bm,region,maxArea,areaNames,lagrimaAreaLabels) {
	if(areaNames[region] == null) {
		areaNames[region] = [];
	}
	while(areaNames[region].length <= maxArea) {
		var bArea = areaNames[region].length;
		if(region == 0) {
			if(bArea > 0) {
				var pur = bm.enemyAreaFromProcedural.GetProceduralUnitRepeated(bArea - 1);
				var characteristic = pur.proceduralUnit.characteristics[0];
				var text = lagrimaAreaLabels[characteristic];
				switch(pur.proceduralUnit.repeat) {
				case 1:
					text += " II";
					break;
				case 2:
					text += " III";
					break;
				case 3:
					text += " IV";
					break;
				case 4:
					text += " V";
					break;
				}
				text += " - " + (pur.position + 1);
				areaNames[region].push(text);
			} else if(region == 0) {
				areaNames[region].push("Home");
			} else {
				areaNames[region].push("Entrance");
			}
		} else if(bArea == 0) {
			areaNames[region].push("Entrance");
		} else {
			areaNames[region].push("Danger Area " + bArea);
		}
	}
	if(areaNames[region].length > maxArea + 1) {
		areaNames[region].length = maxArea + 1;
	}
};
GRIControl.prototype = {
	setupTitle: function() {
		this.view.setupTitleTabButtons();
		this.titleControl.setupView(this);
		this.view.showTab(GRIView.tagTabTitle);
	}
	,setupView: function() {
		var _gthis = this;
		this.gameStartedAfterTitle = true;
		this.view.uiCreation.tags.length = 0;
		this.view.setupTabButtons();
		this.equipControl.setupView();
		this.regionControl.setupView();
		this.view.uiCreation.singleTag(GRIView.tagTabBattle);
		this.view.setupBattleActors();
		this.view.setupMiscBattle();
		this.view.addButton("levelup","Level Up","mainbutton","mainbuttongroup");
		var createButtonFromAction = function(actionId,label,buttontype,layoutid,warning) {
			if(layoutid == null) {
				layoutid = "mainbuttongroup";
			}
			if(buttontype == null) {
				buttontype = "mainbutton";
			}
			_gthis.view.addButton(actionId,label,buttontype,layoutid);
			_gthis.eventToAction.h[actionId] = actionId;
			if(warning != null) {
				_gthis.eventToWarning.h[actionId] = warning;
			}
		};
		createButtonFromAction("sleep","Sleep");
		this.eventToAction.h["repeat"] = "repeat";
		var prestigeWarn = "Your XP gains will increase by a small amount" + ". \nYou will keep all permanent stat bonuses. \n\nYou will go back to Level 1. \nYour progress in all regions will be reset. \nAll that is not equipped will be lost. \nAll that is equipped will lose strength.";
		createButtonFromAction("prestige","Soul Crush","mainbutton","mainbuttongroup",{ title : "Soul Crush", description : prestigeWarn, buttonYes : "Soul Crush", buttonFalse : "Cancel"});
		var skillSlotId = 0;
		var bid = "battleaction_" + 0;
		createButtonFromAction(bid,"Action " + 0);
		var skillSlotId = 1;
		var bid = "battleaction_" + 1;
		createButtonFromAction(bid,"Action " + 1);
		var skillSlotId = 2;
		var bid = "battleaction_" + 2;
		createButtonFromAction(bid,"Action " + 2);
		var skillSlotId = 3;
		var bid = "battleaction_" + 3;
		createButtonFromAction(bid,"Action " + 3);
		var skillSlotId = 4;
		var bid = "battleaction_" + 4;
		createButtonFromAction(bid,"Action " + 4);
		var skillSlotId = 5;
		var bid = "battleaction_" + 5;
		createButtonFromAction(bid,"Action " + 5);
		var skillSlotId = 6;
		var bid = "battleaction_" + 6;
		createButtonFromAction(bid,"Action " + 6);
		this.view.setupMisc();
		this.view.setupDialog();
		this.view.showTab(GRIView.tagTabBattle);
	}
	,update: function(miliseconds) {
		var _gthis = this;
		this.titleControl.update();
		this.view.update(miliseconds,Mouse.mouse);
		if(this.gameStartedAfterTitle == false) {
			return;
		}
		this.battleManager.update(miliseconds / 1000);
		var bm = this.battleManager;
		this.equipControl.update();
		this.regionControl.update();
		var json = bm.GetJsonPersistentData();
		var json2 = "";
		var masterPers = { worldVersion : bm.wdata.worldVersion, jsonGameplay : json, jsonStory : json2};
		var jsonMaster = JSON.stringify(masterPers);
		CrossTarget.SetLocalStorageItem(GRIControl.key,jsonMaster);
		this.view.uiCreation.singleTag(GRIView.tagTabBattle);
		TurnOrderControl.feed(this.turnOrderView,this.battleManager,this.view,TurnOrderData.charaSprites);
		var actorView = this.view.heroBattleView;
		var hero = bm.wdata.hero;
		this.actorToView(hero,actorView,false);
		this.actorToView(bm.wdata.enemy,this.view.enemyBattleView,true);
		var executeAction = function(actionId) {
			if(actionId != null) {
				var action = bm.playerActions.h[actionId];
				var actionData = bm.wdata.playerActions.h[actionId];
				if(actionData.enabled) {
					action.actualAction(actionData);
				}
			}
		};
		var buttonToAction = function(actionId,buttonId) {
			var action = bm.wdata.playerActions.h[actionId];
			_gthis.view.ui.elementVisibility(buttonId,action.visible);
			_gthis.view.ui.elementEnabled(buttonId,action.enabled);
		};
		if(this.view.dialogResult == ConfirmResult.YES || this.view.dialogResult == ConfirmResult.NO) {
			if(this.view.dialogResult == ConfirmResult.YES) {
				if(this.view.dialogData != null) {
					executeAction(this.view.dialogData);
				}
			}
			this.view.endDialog();
		}
		var action = bm.wdata.playerActions.h["tabequipment"];
		this.view.tabAccessible(GRIView.tagTabEquip,action.visible);
		GRIControl.refreshAreaName(bm,bm.wdata.battleAreaRegion,bm.wdata.maxArea,this.areaNames,this.lagrimaAreaLabels);
		this.regionControl.updateAreaNames(this.areaNames[bm.wdata.battleAreaRegion],bm.wdata.battleArea);
		this.view.areaElement.text = this.areaNames[bm.wdata.battleAreaRegion][bm.wdata.battleArea];
		this.view.areaProgressElement.text = bm.wdata.killedInArea[bm.wdata.battleArea] + " / " + bm.wdata.necessaryToKillInArea;
		buttonToAction("retreat","retreat");
		buttonToAction("levelup","levelup");
		buttonToAction("sleep","sleep");
		buttonToAction("repeat","repeat");
		buttonToAction("prestige","prestige");
		buttonToAction("advance","advance");
		var _g = 0;
		while(_g < 7) {
			var i = _g++;
			var id = "battleaction_" + i;
			buttonToAction(id,id);
			var skills = bm.wdata.hero.usableSkills;
			if(skills[i] != null) {
				var action = bm.wdata.playerActions.h[id];
				var header = "Locked";
				var desc = "You do not yet have what it takes to use this skill";
				if(action.mode == 0 || action.mode == 2) {
					var sb = bm.GetSkillBase(skills[i].id);
					var skillName = sb.id;
					if(skills[i].level > 1) {
						var code = 80 + skills[i].level;
						skillName += " " + String.fromCodePoint(code);
					}
					this.view.ui.elementTextId(id,skillName + " - " + sb.mpCost + "MP");
					header = skillName;
					desc = this.SkillToExplanation.h[sb.id];
				}
				var tmp = action.mode == 2 && action.enabled == false;
				if(action.mode == 1) {
					this.view.ui.elementTextId(id,"Unlock at Level " + bm.skillSlotUnlocklevel[i]);
				}
				this.view.ui.hover.setHoverGeneric(this.view.ui.getElement(id),header,desc);
			}
		}
		var sleepAct = bm.wdata.playerActions.h["sleep"];
		if(sleepAct.mode == 0) {
			this.view.ui.elementTextId("sleep","Nap");
		} else {
			this.view.ui.elementTextId("sleep","Wake up");
		}
		var pact = bm.wdata.playerActions.h["prestige"];
		if(pact.enabled == true) {
			this.view.ui.elementTextId("prestige","Soul Crush");
		} else {
			this.view.ui.elementTextId("prestige","Unlock at Level " + bm.GetLevelRequirementForPrestige());
		}
		var _g1_current = 0;
		var _g1_array = this.view.ui.dataEvents;
		while(_g1_current < _g1_array.length) {
			var _g2_value = _g1_array[_g1_current];
			var _g2_key = _g1_current++;
			var index = _g2_key;
			var value = _g2_value;
			if(value.stringData == "advance") {
				this.battleManager.AdvanceArea();
				continue;
			}
			if(value.stringData == "retreat") {
				this.battleManager.RetreatArea();
				continue;
			}
			if(value.stringData == "levelup") {
				this.battleManager.LevelUp();
				continue;
			}
			var warning = this.eventToWarning.h[value.stringData];
			var actionRun = true;
			if(warning != null) {
				actionRun = false;
				this.view.showDialog(warning);
				this.view.dialogData = "prestige";
			}
			if(actionRun) {
				var actionId = this.eventToAction.h[value.stringData];
				if(actionId != null) {
					executeAction(actionId);
					continue;
				}
			}
		}
		if(this.eventsShown < bm.events.length) {
			var _g = this.eventsShown;
			var _g1 = bm.events.length;
			while(_g < _g1) {
				var i = _g++;
				var event = bm.events[i];
				var dataString = event.dataString;
				var data = event.data;
				if(event.type == EventTypes.EquipDrop) {
					this.view.lootList.addEvent(GRIControlEquip.GetEquipName(bm.wdata.hero.equipment[event.data],bm));
				}
				if(event.type == EventTypes.EquipMaxed) {
					this.genericWarning.title = "Equipment reached Limit Level";
					this.genericWarning.description = "Your equipment reached Limit Level. The energy materializes into " + dataString + " +" + data;
					this.view.showDialog(this.genericWarning);
				}
			}
			this.eventsShown = bm.events.length;
		}
	}
	,render: function() {
		var bm = this.battleManager;
		this.view.render();
	}
	,actorToView: function(actor,actorView,enemyName) {
		if(enemyName == null) {
			enemyName = false;
		}
		var bm = this.battleManager;
		this.view.uiCreation.singleTag(GRIView.tagTabBattle);
		actorView.icon.visible = actor != null && actor.attributesCalculated.h["Life"] > 0;
		if(actor != null) {
			if(enemyName) {
				if(bm.wdata.battleAreaRegion == 0) {
					var eafp = bm.enemyAreaFromProcedural;
					var eai = eafp.GetEnemyAreaInformation(bm.wdata.battleArea - 1);
					actorView.mainName.text = this.enemyLabels[0][eai.sheetId];
					if(this.lagrimaAreaPrefix[eai.equipId] != null) {
						actorView.mainName.text = this.lagrimaAreaPrefix[eai.equipId] + " " + actorView.mainName.text;
					}
					if(eai.level > 0) {
						if(eai.level < 10) {
							actorView.mainName.text += " Forte";
						} else if(eai.level < 30) {
							actorView.mainName.text += " Monstro";
						} else {
							actorView.mainName.text += " do Carai";
						}
					}
				} else {
					actorView.mainName.text = this.enemyLabels[bm.wdata.battleAreaRegion][0];
					var code = 65 + bm.wdata.battleArea - 1;
					actorView.mainName.text += " " + String.fromCodePoint(code);
				}
			}
			var va = actor.viewAux;
			var sprite = TurnOrderData.charaSprites[va];
			actorView.icon.style.sprite = sprite;
			while(actor.buffs.length > actorView.buffs.length) {
				var buffTurn;
				var buffImage;
				buffTurn = this.view.addText("buffamount " + actorView.buffs.length,"99",GRIView.ARCHETYPE_SIMPLE,null,actorView.tag);
				buffTurn.transform.position.x = actorView.mainName.transform.position.x + 220 - actorView.buffs.length * 24;
				buffTurn.transform.position.y = actorView.mainName.transform.position.y + 7;
				this.view.uiCreation.addElement(buffTurn);
				buffImage = new UIElement();
				buffImage.tags.push(actorView.tag);
				this.view.uiCreation.addElement(buffImage);
				actorView.buffs.push({ icon : buffImage, duration : buffTurn, parent : null});
			}
			var _g_current = 0;
			var _g_array = actor.buffs;
			while(_g_current < _g_array.length) {
				var _g1_value = _g_array[_g_current];
				var _g1_key = _g_current++;
				var index = _g1_key;
				var value = _g1_value;
				var buffV = actorView.buffs[index];
				buffV.duration.text = "" + value.duration;
				actorView.buffs[index].icon.style.sprite = this.buffToIcon.h[value.uniqueId];
				var color = GRIView.COLOR_BUFF;
				if(actor.buffs[index].debuff) {
					color = GRIView.COLOR_DEBUFF;
				}
				if(actorView.buffs[index].icon.style.sprite == null) {
					if(value.debuff) {
						actorView.buffs[index].icon.style.sprite = this.debuffIconDefault;
					} else {
						actorView.buffs[index].icon.style.sprite = this.buffIconDefault;
					}
				}
				actorView.buffs[index].icon.style.color = color;
				actorView.buffs[index].duration.style.color = color;
				actorView.buffs[index].icon.transform.position.x = actorView.buffs[index].duration.transform.position.x - actorView.buffs[index].icon.style.sprite.rect.width / 2;
				actorView.buffs[index].icon.transform.position.y = actorView.buffs[index].duration.transform.position.y - 3 - actorView.buffs[index].icon.style.sprite.rect.height;
				var y = actorView.buffs[index].icon.style.sprite.rect.height;
				var self = actorView.buffs[index].icon.transform.size;
				self.x = actorView.buffs[index].icon.style.sprite.rect.width;
				self.y = y;
				if(Object.prototype.hasOwnProperty.call(this.buffToExplanation.h,value.uniqueId)) {
					this.view.ui.hover.setHoverGeneric(actorView.buffs[index].icon,value.uniqueId,this.buffToExplanation.h[value.uniqueId]);
				}
			}
			var _g = 0;
			var _g1 = actorView.buffs.length;
			while(_g < _g1) {
				var i = _g++;
				actorView.buffs[i].icon.visible = i < actor.buffs.length;
				actorView.buffs[i].duration.visible = i < actor.buffs.length;
			}
			this.view.ui.updateBarValue(actorView.hpBar,bm.GetAttribute(actor,"Life"),bm.GetAttribute(actor,"LifeMax"));
			var rc = bm.GetAttribute(actor,"MPRechargeCount");
			var mp = bm.GetAttribute(actor,"MP");
			var mpmax = bm.GetAttribute(actor,"MPMax");
			if(rc < 10000) {
				mp = rc;
				mpmax = 10000;
				this.view.ui.updateBarLeftText(actorView.mpBar,"charge");
				actorView.mpBar.barPortion.style.sprite = GRIView.SPRITE_PINKGRAD;
			} else {
				this.view.ui.updateBarLeftText(actorView.mpBar,"mp");
				actorView.mpBar.barPortion.style.sprite = GRIView.SPRITE_BLUEGRAD;
			}
			this.view.ui.updateBarValue(actorView.mpBar,mp,mpmax);
		}
		this.view.ui.tagVisibility(actorView.tag,actor != null);
	}
	,__class__: GRIControl
};
var EquipMode = $hxEnums["EquipMode"] = { __ename__:true,__constructs__:null
	,EQUIP: {_hx_name:"EQUIP",_hx_index:0,__enum__:"EquipMode",toString:$estr}
	,SELL: {_hx_name:"SELL",_hx_index:1,__enum__:"EquipMode",toString:$estr}
	,UPGRADE: {_hx_name:"UPGRADE",_hx_index:2,__enum__:"EquipMode",toString:$estr}
};
EquipMode.__constructs__ = [EquipMode.EQUIP,EquipMode.SELL,EquipMode.UPGRADE];
var GRIControlEquip = function(battleM,control) {
	var _g = new haxe_ds_EnumValueMap();
	_g.set(EquipMode.SELL,"Sell:");
	_g.set(EquipMode.UPGRADE,"Upgrade:");
	this.modeToSpecialHeader = _g;
	this.mode = EquipMode.EQUIP;
	this.equipTypeVisible = 0;
	this.equipTypeNames = ["Weapons","Armor","Skill Set","Other"];
	this.control = control;
	this.battleManager = battleM;
	this.equipView = control.view.equipView;
};
GRIControlEquip.__name__ = "GRIControlEquip";
GRIControlEquip.GetEquipName = function(e,bm) {
	var itemBases = bm.itemBases;
	var modBases = bm.modBases;
	var skillSets = bm.wdata.skillSets;
	if(e.generationBaseItem >= 0) {
		var name = itemBases[e.generationBaseItem].name;
		if(e.generationPrefixMod >= 0) {
			name = modBases[e.generationPrefixMod].prefix + " " + name;
		}
		if(e.generationSuffixMod >= 0) {
			name = name + " " + modBases[e.generationSuffixMod].suffix;
		}
		var level = bm.wdata.equipLevels[e.outsideSystems.h["level"]].level;
		var levelP = (level - 1) / 3 | 0;
		var levelS = (level - 1) % 3 + 1;
		name += " ";
		var character = "+";
		var _g = 0;
		var _g1 = level;
		while(_g < _g1) {
			var i = _g++;
			name += character;
		}
		return name;
	}
	if(e.outsideSystems != null) {
		if(Object.prototype.hasOwnProperty.call(e.outsideSystems.h,"skillset")) {
			var skillSet = e.outsideSystems.h["skillset"];
			var ss = skillSets[skillSet];
			var main = ss.skills[0];
			var sbMain = bm.GetSkillBase(main.id);
			var profession = "Corrupter";
			if(sbMain != null) {
				profession = bm.GetSkillBase(main.id).profession;
			}
			var word1 = null;
			var word2 = null;
			if(ss.skills.length > 1) {
				var skillBase1 = bm.GetSkillBase(ss.skills[1].id);
				word1 = bm.GetSkillBase(ss.skills[0].id).word;
				if(skillBase1 != null) {
					profession = bm.GetSkillBase(ss.skills[1].id).profession;
				}
			}
			if(ss.skills.length > 2) {
				word2 = bm.GetSkillBase(ss.skills[2].id).word;
			}
			if(word2 != null) {
				return "" + word1 + " " + profession + " of " + word2;
			}
			if(word1 != null) {
				return "" + word1 + " " + profession;
			}
			return profession;
		}
	}
	var equipName = "Sword";
	if(e.type == 1) {
		equipName = "Armor";
	}
	return equipName;
};
GRIControlEquip.prototype = {
	setupView: function() {
		this.equipView.feedEquipmentTypeNames(this.equipTypeNames);
		this.equipView.setup();
		this.changeEquipMode(EquipMode.EQUIP);
	}
	,changeEquipMode: function(mode) {
		this.mode = mode;
		this.control.view.ui.tagVisibility(GRIViewEquip.TAG_EQUIPBUTTON_SPECIALWIDGET,mode != EquipMode.EQUIP);
	}
	,update: function() {
		var bm = this.battleManager;
		var equipViewPos = 0;
		this.control.view.ui.genUI.extendLayoutWidth("equipbutton",30);
		this.control.view.ui.extendElementHeight(this.equipView.scroll.viewport,95);
		var hoveredEquip = -1;
		var hoveredView = -1;
		var _g = 0;
		var _g1 = bm.wdata.hero.equipment.length;
		while(_g < _g1) {
			var i = _g++;
			var e = bm.wdata.hero.equipment[i];
			if(e != null) {
				if(e.type == this.equipTypeVisible) {
					if(e.seen >= 0 == false) {
						e.seen = 2;
					}
					if(e.seen == 0) {
						var equipTab = false;
						if(equipTab) {
							e.seen = 1;
						}
					}
					var rarity = 0;
					if(e.generationPrefixMod >= 0 || e.generationSuffixMod >= 0) {
						rarity = 1;
					}
					var upgradeCost = 0;
					var upgradable = BattleManager.IsUpgradable(e,bm.wdata);
					var equipName = GRIControlEquip.GetEquipName(e,bm);
					this.equipView.feedEquipment(i,equipViewPos,equipName,bm.IsEquipped(i,false));
					if(this.equipView.isSelected(equipViewPos)) {
						hoveredEquip = i;
						hoveredView = equipViewPos;
					}
					++equipViewPos;
				}
			}
		}
		this.equipView.visibilityOfEquipViewCutoff(equipViewPos);
		if(this.mode == EquipMode.EQUIP) {
			var _g = 0;
			var _g1 = this.equipView.equipmentViews;
			while(_g < _g1.length) {
				var ev = _g1[_g];
				++_g;
				ev.mainButton.enabled = true;
			}
		}
		if(this.mode == EquipMode.SELL) {
			var _g = 0;
			var _g1 = this.equipView.equipmentViews;
			while(_g < _g1.length) {
				var ev = _g1[_g];
				++_g;
				var eId = ev.mainButton.data.intData;
				var e = this.battleManager.wdata.hero.equipment[eId];
				if(e != null) {
					var sellPrize = BattleManager.GetSellPrize(e,this.battleManager.wdata);
					ev.specialElementText.text = "+" + sellPrize;
					ev.specialHeader.text = "Sell:";
					ev.mainButton.enabled = !this.battleManager.IsEquipped(eId,true);
				}
			}
		}
		if(this.mode == EquipMode.UPGRADE) {
			var bm1 = this.battleManager;
			var _g = 0;
			var _g1 = this.equipView.equipmentViews;
			while(_g < _g1.length) {
				var ev = _g1[_g];
				++_g;
				var eId = ev.mainButton.data.intData;
				var e = this.battleManager.wdata.hero.equipment[eId];
				if(e != null) {
					var upgradeLabel = "Upgrade";
					var upgradeCurrency = "Lagrima";
					var canUpgrade = false;
					var upgradeCost = 0;
					var upgradable = BattleManager.IsUpgradable(e,bm1.wdata);
					if(upgradable) {
						canUpgrade = BattleManager.CanUpgrade(e,bm1.wdata);
						upgradeCost = BattleManager.GetCost(e,bm1.wdata);
					} else {
						var limitable = BattleManager.IsLimitBreakable(e,bm1.wdata);
						if(limitable) {
							upgradable = limitable;
							canUpgrade = BattleManager.CanLimitBreak(e,bm1.wdata);
							upgradeCost = BattleManager.GetLimitBreakCost(e,bm1.wdata);
							upgradeLabel = "Limit Break";
							upgradeCurrency = "Lagrima Stone";
						}
					}
					ev.mainButton.enabled = canUpgrade;
					ev.specialElementText.text = "" + upgradeCost;
					ev.specialHeader.text = upgradeLabel;
				}
			}
		}
		var _g2_current = 0;
		var _g2_array = bm.wdata.hero.equipmentSets[bm.wdata.hero.chosenEquipSet].equipmentSlots;
		while(_g2_current < _g2_array.length) {
			var _g3_value = _g2_array[_g2_current];
			var _g3_key = _g2_current++;
			var index = _g3_key;
			var value = _g3_value;
			if(value >= 0) {
				var e = bm.wdata.hero.equipment[value];
				var ename = GRIControlEquip.GetEquipName(e,bm);
				this.equipView.feedEquipped(value,index,ename,index == this.equipTypeVisible);
			} else {
				this.equipView.feedEquipped(-1,index,this.equipTypeNames[index],index == this.equipTypeVisible);
			}
		}
		this.equipView.equipmentTags();
		ActorViewLogic.feed(bm.wdata.hero,this.equipView.actorEquipView,this.control.view);
		var afterStats = null;
		if(hoveredEquip >= 0) {
			afterStats = bm.getStatsIfEquipped(bm.wdata.hero,hoveredEquip);
		}
		ActorViewLogic.feed(bm.wdata.hero,this.equipView.actorEquipView,this.control.view,afterStats);
		CurrencyViewLogic.update(this.equipView.currencyView,this.control.view,this.control.battleManager);
		if(hoveredEquip >= 0) {
			var equip = bm.wdata.hero.equipment[hoveredEquip];
			var e = equip;
			this.equipView.hover_Header.text = GRIControlEquip.GetEquipName(equip,bm);
			console.log("Sources\GRI/GRIControlEquip.hx:164:",this.equipView.hover_Header.text);
			this.equipView.hoverOn(hoveredView);
			var vid = 0;
			if(e.outsideSystems != null) {
				if(Object.prototype.hasOwnProperty.call(e.outsideSystems.h,"skillset")) {
					var ss = e.outsideSystems.h["skillset"];
					var ssd = bm.wdata.skillSets[ss];
					var _g = 0;
					var _g1 = ssd.skills.length;
					while(_g < _g1) {
						var s = _g++;
						var actionId = "battleaction_" + s;
						var action = bm.wdata.playerActions.h[actionId];
						if(action.mode == 0) {
							var skillName = ssd.skills[s].id;
							if(ssd.skills[s].level > 1) {
								var code = 80 + ssd.skills[s].level;
								skillName += " " + String.fromCodePoint(code);
							}
							this.equipView.setEquipmentHoverInfo(skillName,vid);
						}
						if(action.mode == 1) {
							this.equipView.setEquipmentHoverInfo("???",vid);
						}
						++vid;
					}
				}
			}
			var h = equip.attributes.h;
			var _g2_h = h;
			var _g2_keys = Object.keys(h);
			var _g2_length = _g2_keys.length;
			var _g2_current = 0;
			while(_g2_current < _g2_length) {
				var key = _g2_keys[_g2_current++];
				var _g3_key = key;
				var _g3_value = _g2_h[key];
				var key1 = _g3_key;
				var value = _g3_value;
				this.equipView.setEquipmentHoverInfo("" + key1 + " +" + value,vid);
				++vid;
			}
			if(equip.attributeMultiplier != null) {
				var h = equip.attributeMultiplier.h;
				var _g2_h = h;
				var _g2_keys = Object.keys(h);
				var _g2_length = _g2_keys.length;
				var _g2_current = 0;
				while(_g2_current < _g2_length) {
					var key = _g2_keys[_g2_current++];
					var _g3_key = key;
					var _g3_value = _g2_h[key];
					var key1 = _g3_key;
					var value = _g3_value;
					var percent = value - 100;
					if(percent >= 0) {
						this.equipView.setEquipmentHoverInfo("" + key1 + " +" + percent + "%",vid);
					} else {
						this.equipView.setEquipmentHoverInfo("" + key1 + " " + percent + "%",vid);
					}
					++vid;
				}
			}
			this.equipView.endEquipmentHoverInfo(vid);
		} else {
			this.equipView.hoverOn(-1);
		}
		var evs = this.control.view.ui.dataEvents;
		var _g2_current = 0;
		var _g2_array = evs;
		while(_g2_current < _g2_array.length) {
			var _g3_value = _g2_array[_g2_current];
			var _g3_key = _g2_current++;
			var index = _g3_key;
			var value = _g3_value;
			if(value != null && value.stringData != null) {
				if(value.stringData.indexOf(GRIViewEquip.equippedViewIdPart) != -1) {
					var index1 = value.intData;
					this.equipTypeVisible = index1;
				}
				if(value.stringData.indexOf(GRIViewEquip.equipmentViewIdPart) != -1) {
					var index2 = value.intData;
					if(this.mode == EquipMode.EQUIP) {
						bm.ToggleEquipped(index2);
					}
					if(this.mode == EquipMode.SELL) {
						bm.SellEquipment(index2);
					}
					if(this.mode == EquipMode.UPGRADE) {
						bm.UpgradeOrLimitBreakEquipment(index2);
					}
				}
				if(value.stringData == GRIViewEquip.DATA_SELL) {
					this.changeEquipMode(EquipMode.SELL);
				}
				if(value.stringData == GRIViewEquip.DATA_EQUIP) {
					this.changeEquipMode(EquipMode.EQUIP);
				}
				if(value.stringData == GRIViewEquip.DATA_UPGRADE) {
					this.changeEquipMode(EquipMode.UPGRADE);
				}
				if(value.stringData == GRIViewEquip.DATA_SELL_WORSE) {
					bm.DiscardWorseEquipment();
				}
				if(value.stringData == GRIView.tagTabEquip) {
					this.changeEquipMode(EquipMode.EQUIP);
				}
			}
		}
	}
	,__class__: GRIControlEquip
};
var GRIControlRegion = function(control,bm) {
	this.areaFeed = new UIFeedLists();
	this.regionFeed = new UIFeedLists();
	this.battleManager = bm;
	this.control = control;
	this.regionFeed.initList("STANDARD");
	this.regionFeed.initList("DANGER");
	this.regionFeed.set(GRIControlRegion.listStandard,0,"Lagrima Continent","");
	this.regionFeed.setData(GRIControlRegion.listStandard,0,"regionbutton",0);
	this.areaFeed.initList("AREAS OF REGION");
	this.viewRegion = new GRIViewRegion(control.view);
};
GRIControlRegion.__name__ = "GRIControlRegion";
GRIControlRegion.prototype = {
	update: function() {
		var maxRegion = this.battleManager.wdata.battleAreaRegionMax;
		var showLocked = 0;
		if(maxRegion < GRIControlRegion.enemyRegionNames.length) {
			showLocked = 1;
		}
		var regionIndex = 0;
		var _g = 1;
		var _g1 = maxRegion;
		while(_g < _g1) {
			var i = _g++;
			this.regionFeed.set(GRIControlRegion.listDanger,regionIndex,GRIControlRegion.enemyRegionNames[i],"");
			this.regionFeed.setData(GRIControlRegion.listDanger,regionIndex,GRIControlRegion.dataRegionB,i);
			++regionIndex;
		}
		if(showLocked > 0) {
			this.regionFeed.set(GRIControlRegion.listDanger,regionIndex,"Unreached","",false);
			this.regionFeed.setData(GRIControlRegion.listDanger,regionIndex,null,-1);
			++regionIndex;
		}
		this.viewRegion.feedRegionButtons(this.regionFeed);
		var evs = this.control.view.ui.dataEvents;
		var _g2_current = 0;
		var _g2_array = evs;
		while(_g2_current < _g2_array.length) {
			var _g3_value = _g2_array[_g2_current];
			var _g3_key = _g2_current++;
			var index = _g3_key;
			var value = _g3_value;
			if(value != null && value.stringData != null) {
				if(value.stringData == GRIControlRegion.dataRegionB) {
					this.battleManager.changeRegion(value.intData);
				}
				if(value.stringData == GRIControlRegion.dataAreaB) {
					this.battleManager.ChangeBattleArea(value.intData);
					this.control.view.showTab(GRIView.tagTabBattle);
				}
			}
		}
	}
	,setupView: function() {
		this.viewRegion.setup();
	}
	,updateAreaNames: function(areaNames,currentArea) {
		var _g_current = 0;
		var _g_array = areaNames;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			this.areaFeed.set(0,index,value,"",true);
			this.areaFeed.setData(0,index,GRIControlRegion.dataAreaB,index);
		}
		this.areaFeed.feedLists[0].invisibleAfterCap(areaNames.length);
		this.viewRegion.feedAreaButtons(this.areaFeed);
	}
	,__class__: GRIControlRegion
};
var GRIControlTitle = function(battleManager) {
};
GRIControlTitle.__name__ = "GRIControlTitle";
GRIControlTitle.prototype = {
	setupView: function(control) {
		this.control = control;
		this.titleView = new GRIViewTitle();
		this.titleView.view = control.view;
		this.titleView.setupUI();
	}
	,update: function() {
		this.control.view.ui.elementVisibility(GRIViewTitle.DATA_CONTINUE,this.control.gameStartedAfterTitle == false);
		var _g = 0;
		var _g1 = this.control.view.ui.dataEvents;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			if(data.stringData == GRIViewTitle.DATA_DISCORD) {
				CrossTarget.OpenURL("https://discord.gg/AtGrxpM");
			}
			if(data.stringData == GRIViewTitle.DATA_STEAM) {
				CrossTarget.OpenURL("https://store.steampowered.com/app/1858120/Generic_RPG_Idle/");
			}
			if(data.stringData == GRIViewTitle.DATA_RESET) {
				this.control.battleManager = new BattleManager();
				var bm = this.control.battleManager;
				bm.ForceSkillSetDrop(-1,null,{ skills : [{ id : "Slash", level : 1},{ id : "Cure", level : 1},{ id : "Protect", level : 3}]},false);
				bm.wdata.hero.equipmentSets[bm.wdata.hero.chosenEquipSet].equipmentSlots[2] = 0;
				CrossTarget.resetLocalStorage(GRIControl.key);
				CrossTarget.reload();
			}
			if(data.stringData == GRIViewTitle.DATA_CONTINUE) {
				this.control.setupView();
			}
		}
	}
	,__class__: GRIControlTitle
};
var Sprite = function(spriteN,imageSize) {
	this.rect = new Rect(0,0,0,0);
	this.spriteName = spriteN;
	this.rect.width = imageSize;
	this.rect.height = imageSize;
};
Sprite.__name__ = "Sprite";
Sprite.create = function(spriteN,w,h) {
	var sprite = new Sprite(spriteN,w);
	sprite.rect.height = h;
	return sprite;
};
Sprite.prototype = {
	__class__: Sprite
};
var TurnOrderData = function() { };
TurnOrderData.__name__ = "TurnOrderData";
var TurnOrderView = function() {
	this.images = [];
};
TurnOrderView.__name__ = "TurnOrderView";
TurnOrderView.prototype = {
	__class__: TurnOrderView
};
var TurnOrderControl = function() { };
TurnOrderControl.__name__ = "TurnOrderControl";
TurnOrderControl.feed = function(view,bm,viewGRI,sprites) {
	var turnList = bm.turnList;
	while(turnList.length > view.images.length) {
		var im = viewGRI.uiCreation.createImageElement(null,36,36);
		viewGRI.uiCreation.addElementInLayoutId(im,view.layoutId);
		im.style.alpha = 80;
		if(view.images.length == 0) {
			var size = im.transform.size.x;
			var b = 6;
			var border = viewGRI.uiCreation.createBorder(size + b,size + b);
			viewGRI.uiCreation.addWithOffset(border,im,0,0,-b / 2,-b / 2);
		}
		view.images.push(im);
	}
	var _g_current = 0;
	var _g_array = view.images;
	while(_g_current < _g_array.length) {
		var _g1_value = _g_array[_g_current];
		var _g1_key = _g_current++;
		var index = _g1_key;
		var value = _g1_value;
		if(turnList.length > index) {
			value.style.sprite = sprites[turnList[index]];
			value.visible = true;
			if(value.style.sprite == null) {
				value.style.sprite = Sprite.create("heroicon",512,512);
			}
		} else {
			value.visible = false;
		}
	}
};
var ConfirmResult = $hxEnums["ConfirmResult"] = { __ename__:true,__constructs__:null
	,IDLE: {_hx_name:"IDLE",_hx_index:0,__enum__:"ConfirmResult",toString:$estr}
	,WAIT: {_hx_name:"WAIT",_hx_index:1,__enum__:"ConfirmResult",toString:$estr}
	,YES: {_hx_name:"YES",_hx_index:2,__enum__:"ConfirmResult",toString:$estr}
	,NO: {_hx_name:"NO",_hx_index:3,__enum__:"ConfirmResult",toString:$estr}
};
ConfirmResult.__constructs__ = [ConfirmResult.IDLE,ConfirmResult.WAIT,ConfirmResult.YES,ConfirmResult.NO];
var EventView = function() {
	this.activeEventCount = 5;
	this.eventElements = [];
};
EventView.__name__ = "EventView";
EventView.prototype = {
	initEventElements: function(number,layout,ui) {
		while(this.eventElements.length < number) {
			var e = new UIElement();
			var self = e.transform.size;
			self.x = 145;
			self.y = 14;
			e.styleHover = new Style();
			e.styleHover.color = -1146434356;
			e.text = "";
			ui.addElementInLayoutId(e,layout);
			this.eventElements.push(e);
		}
	}
	,addEvent: function(text) {
		var _g = 0;
		var _g1 = this.eventElements.length;
		while(_g < _g1) {
			var i = _g++;
			if(i == this.eventElements.length - 1) {
				this.eventElements[this.eventElements.length - i - 1].text = text;
			} else {
				this.eventElements[this.eventElements.length - i - 1].text = this.eventElements[this.eventElements.length - i - 2].text;
			}
		}
	}
	,__class__: EventView
};
var GRIView = function() {
	this.dialogMiscTag = "dialogmisc";
	this.lootList = new EventView();
	this.tabTags = [];
	this.ui = new UIElementManager(5);
	this.uiCreation = new UICreation(this.ui);
	this.equipView = new GRIViewEquip(this);
};
GRIView.__name__ = "GRIView";
GRIView.prototype = {
	update: function(miliseconds,mouse) {
		this.ui.Update(miliseconds,mouse);
		var _g = 0;
		var _g1 = this.ui.dataEvents;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			if(data.stringData == "dialogyes") {
				this.dialogResult = ConfirmResult.YES;
			}
			if(data.stringData == "dialogno") {
				this.dialogResult = ConfirmResult.NO;
			}
			if(this.tabTags.indexOf(data.stringData) != -1) {
				this.showTab(data.stringData);
			}
		}
	}
	,showTab: function(tab) {
		this.currentTab = tab;
		var _g_current = 0;
		var _g_array = this.tabTags;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			this.ui.tagVisibility(value,value == tab);
			this.ui.getElement(value).selected = value == tab;
		}
	}
	,tabAccessible: function(tab,access) {
		this.ui.elementVisibility(tab,access);
	}
	,render: function() {
		this.ui.render();
	}
	,backgroundElement: function(layoutId,archetype,tag,fitChildren) {
		if(fitChildren == null) {
			fitChildren = true;
		}
		if(archetype == null) {
			archetype = "";
		}
		var e = new UIElement();
		var margin = null;
		if(archetype == GRIView.ARCHETYPE_BG_DEFAULT) {
			e.style.color = GRIView.COLOR_BACKGROUND;
			e.style.border = 2;
			e.style.fill = true;
			e.style.borderColor = GRIView.COLOR_OUTLINE;
			margin = new Rect(10,20,10,20);
		}
		if(archetype == GRIView.ARCHETYPE_BG_SIMPLE) {
			e.style.color = GRIView.COLOR_BACKGROUND_GRAY;
			e.style.fill = true;
		}
		if(tag != null) {
			e.tags.push(tag);
		}
		this.uiCreation.addBackground(e,layoutId,margin,fitChildren);
		return e;
	}
	,setupMisc: function() {
		this.lootList.initEventElements(5,"log",this.uiCreation);
		this.uiCreation.tags.length = 0;
		this.uiCreation.activeLayer = GRIView.LAYER_HOVER;
		this.backgroundElement(GRIView.LAYOUT_HOVER,GRIView.ARCHETYPE_BG_DEFAULT,GRIView.LAYOUT_HOVER);
		var header = this.addText("","Header",GRIView.ARCHETYPE_HEADER_HOVER,GRIView.LAYOUT_HOVER,GRIView.LAYOUT_HOVER,true);
		var mainText = this.addText("","Info",GRIView.ARCHETYPE_IMPORTANT_TIMID,GRIView.LAYOUT_HOVER,GRIView.LAYOUT_HOVER,true);
		this.ui.hover.hoverView = new HoverView(header,mainText,GRIView.LAYOUT_HOVER,GRIView.LAYOUT_HOVER);
		this.ui.tagVisibility(GRIView.LAYOUT_HOVER,false);
		this.uiCreation.activeLayer = GRIView.LAYER_DEFAULT;
	}
	,setupTitleTabButtons: function() {
		this.addButton(GRIView.tagTabTitle,"Title",GRIView.ARCHETYPE_BUTTON_TAB,"tabbutton");
		this.tabTags.push(GRIView.tagTabTitle);
	}
	,setupTabButtons: function() {
		this.addButton(GRIView.tagTabRegion,"Region",GRIView.ARCHETYPE_BUTTON_TAB,"tabbutton");
		this.addButton(GRIView.tagTabBattle,"Battle",GRIView.ARCHETYPE_BUTTON_TAB,"tabbutton");
		this.addButton(GRIView.tagTabEquip,"Equipment",GRIView.ARCHETYPE_BUTTON_TAB,"tabbutton");
		this.tabTags.push(GRIView.tagTabRegion);
		this.tabTags.push(GRIView.tagTabBattle);
		this.tabTags.push(GRIView.tagTabEquip);
	}
	,setupBattleActors: function() {
		this.heroBattleView = this.addActorViewBattleHero(69,121);
		this.enemyBattleView = this.addActorViewBattleEnemy(600,100);
	}
	,FeedAreaNames: function(areaNames,currentArea) {
	}
	,setupMiscBattle: function() {
		var e = this.backgroundElement("area",GRIView.ARCHETYPE_BG_SIMPLE,null,false);
		var retreat = this.addButtonImage("retreat",Sprite.create("arrowleft",25,13),GRIView.ARCHETYPE_BUTTON_SMALL,null,null);
		this.uiCreation.offsetElement(retreat,e,0,0,0,0);
		var advance = this.addButtonImage("advance",Sprite.create("arrowleft",25,13),GRIView.ARCHETYPE_BUTTON_SMALL,null,null,true);
		this.uiCreation.offsetElement(advance,e,1,0,0,0);
		var repeat = this.addButtonImage("repeat",Sprite.create("arrowrepeat",20,17),GRIView.ARCHETYPE_BUTTON_SMALL,"subbuttons",null,true);
		this.areaElement = this.addText("areatext","AREA",GRIView.ARCHETYPE_HEADER_TIMID,null,null,false);
		this.areaProgressElement = this.addText("areatext","AREAPROG",GRIView.ARCHETYPE_SIMPLE_TIMID,null,null,false);
		this.uiCreation.addWithOffset(this.areaElement,e,0.5,0,0,2);
		this.uiCreation.addWithOffset(this.areaProgressElement,e,0.5,0,0,15);
	}
	,setupDialog: function() {
		var e = this.addText("dialogtitle","Title",GRIView.ARCHETYPE_HEADER,"dialogbutton");
		e.textFont = "main16";
		e.tags.push("dialog");
		this.addText("dialogdesc","Description",GRIView.ARCHETYPE_SIMPLE_MEDIUM,"dialogbutton").tags.push("dialog");
		this.addButton("dialogyes","Soul\nCrush","mainbutton","dialogbutton").tags.push("dialog");
		this.addButton("dialogno","Cancel","mainbutton","dialogbutton").tags.push("dialog");
		this.ui.invisibleTags.push("dialog");
	}
	,showDialog: function(warning) {
		this.ui.elementTextId("dialogdesc",warning.description,true);
		this.ui.elementTextId("dialogtitle",warning.title,true);
		this.ui.elementTextId("dialogyes",warning.buttonYes);
		this.ui.elementTextId("dialogno",warning.buttonFalse);
		this.ui.elementVisibility("dialogno",warning.buttonFalse != null);
		this.ui.hogInput("dialog");
		this.ui.hogVisibility("dialog");
		this.dialogResult = ConfirmResult.WAIT;
		HxOverrides.remove(this.ui.invisibleTags,"dialog");
		this.ui.genUI.updateAll();
		this.dialogData = null;
	}
	,endDialog: function() {
		this.ui.endInputHog();
		this.ui.endVisibilityHog();
		this.dialogResult = ConfirmResult.IDLE;
		if(this.ui.invisibleTags.indexOf("dialog") != -1 == false) {
			this.ui.invisibleTags.push("dialog");
		}
	}
	,addText: function(id,label,archetype,layoutId,tag,fitLayoutWidth) {
		if(fitLayoutWidth == null) {
			fitLayoutWidth = false;
		}
		var text = new UIElement();
		text.id = id;
		text.data.stringData = id;
		text.text = label;
		text.transform.size.y = 12;
		if(archetype == GRIView.ARCHETYPE_HEADER_HOVER || archetype == GRIView.ARCHETYPE_IMPORTANT_TIMID || archetype == GRIView.ARCHETYPE_SIMPLE_MEDIUM || archetype == GRIView.ARCHETYPE_HEADER_TIMID) {
			text.textFont = "main14";
		}
		text.style.color = GRIView.COLOR_TEXT_NORMAL;
		if(archetype == GRIView.ARCHETYPE_HEADER) {
			text.style.color = GRIView.COLOR_TEXT_HEADER;
		}
		if(archetype == GRIView.ARCHETYPE_TEXT_ACTION) {
			text.style.color = GRIView.COLOR_TEXT_ACTION;
		}
		if(tag != null) {
			text.tags.push(tag);
		}
		if(layoutId != null) {
			this.uiCreation.addElementInLayoutId(text,layoutId,fitLayoutWidth);
		}
		return text;
	}
	,addActorViewBattleHero: function(x,y) {
		var tag = "herobattleview";
		var mainElementsOffsetX = 15;
		var mainElementsOffsetY = 16;
		return this.addActorViewBattle(x,y,mainElementsOffsetX,mainElementsOffsetY,tag,268,0);
	}
	,addActorViewBattleEnemy: function(x,y) {
		var tag = "enemybattleview";
		var mainElementsOffsetX = 15;
		var mainElementsOffsetY = 24;
		return this.addActorViewBattle(x,y,mainElementsOffsetX,mainElementsOffsetY,tag,-120,0);
	}
	,addActorViewBattle: function(x,y,mainElementsOffsetX,mainElementsOffsetY,tag,iconXOff,iconYOff) {
		var mainX = x + mainElementsOffsetX;
		var mainY = y + mainElementsOffsetY;
		var header;
		var e = new UIElement();
		e.tags.push(tag);
		e.transform.set(mainX,mainY,100,20);
		e.text = "You";
		e.textFont = "main16";
		var self = e.textPivot;
		self.x = 0;
		self.y = 0;
		this.uiCreation.addElement(e);
		header = e;
		var actorIcon;
		var im = this.uiCreation.createImageElement(null,107,107);
		this.uiCreation.addElement(im);
		im.transform.set_x(x + iconXOff);
		im.transform.set_y(y + iconYOff);
		actorIcon = im;
		var hpBar = this.addBar(mainX,mainY + 24,"hp","heroBattleHPbar","heroBattleHPbar",tag);
		var mpBar = this.addBar(mainX,mainY + 24 + 31,"mp","heroBattleMPbar","heroBattleMPbar",tag);
		return { mainName : header, hpBar : hpBar, mpBar : mpBar, tag : tag, buffs : [], icon : actorIcon};
	}
	,addBar: function(x,y,leftText,archetype,tag,parentTag) {
		var w = 230;
		var h = 26;
		var border = 3;
		var barView = { barTag : tag, barMaxSize : w - border * 2};
		var e = new UIElement();
		e.tags.push(tag);
		e.tags.push(parentTag);
		e.transform.set(x,y,w,h);
		e.style.color = GRIView.COLOR_BLACK;
		e.style.fill = true;
		this.uiCreation.addElement(e);
		var e = new UIElement();
		e.tags.push(parentTag);
		e.tags.push(tag);
		e.transform.set(x + border,y + border,w - border * 2,h - border * 2);
		e.style.sprite = GRIView.SPRITE_GREENGRAD;
		if(archetype == "heroBattleMPbar") {
			e.style.sprite = GRIView.SPRITE_BLUEGRAD;
		}
		barView.barPortion = e;
		this.uiCreation.addElement(e);
		var e = new UIElement();
		e.tags.push(parentTag);
		e.tags.push(tag);
		e.transform.set(x + border + 4,y,w,h);
		var self = e.textPivot;
		self.x = 0;
		self.y = 0.5;
		e.text = leftText;
		barView.leftText = e;
		this.uiCreation.addElement(e);
		var e = new UIElement();
		e.tags.push(parentTag);
		e.tags.push(tag);
		e.transform.set(x,y,w,h);
		e.text = "main";
		e.textFont = "main14";
		var self = e.textPivot;
		self.x = 0.5;
		self.y = 0.5;
		barView.mainText = e;
		this.uiCreation.addElement(e);
		return barView;
	}
	,addButtonImage: function(id,img,archetype,layoutId,tag,horizontalInvert,widthIcon,heightIcon) {
		if(heightIcon == null) {
			heightIcon = -1;
		}
		if(widthIcon == null) {
			widthIcon = -1;
		}
		if(horizontalInvert == null) {
			horizontalInvert = false;
		}
		var button = new UIElement();
		var button = this.addButton(id,"",archetype,layoutId,tag);
		var icon = new UIElement();
		icon.managedState = false;
		icon.style.sprite = img;
		icon.styleHover = new Style();
		icon.styleDisabled = new Style();
		icon.styleSelected = new Style();
		icon.styleHover.sprite = img;
		icon.styleDisabled.sprite = img;
		icon.styleSelected.sprite = img;
		if(tag != null) {
			icon.tags.push(tag);
		}
		icon.transform.size.x = img.rect.width;
		if(horizontalInvert) {
			icon.transform.size.x *= -1;
		}
		icon.transform.size.y = img.rect.height;
		if(widthIcon > 0) {
			icon.transform.size.x = widthIcon;
		}
		if(heightIcon > 0) {
			icon.transform.size.y = heightIcon;
		}
		this.uiCreation.offsetElement(icon,button,0.5,0.5,0,0,true,true);
		this.uiCreation.addElement(icon);
		return button;
	}
	,addButton: function(id,label,archetype,layoutId,tag) {
		var button = new UIElement();
		button.id = id;
		button.data.stringData = id;
		button.style.ninePatch = new NinePatch(4,"button9a",32);
		var self = button.transform.size;
		self.x = 145;
		self.y = 45;
		if(archetype == "equipbutton") {
			var self = button.transform.size;
			self.x = 240;
			self.y = 40;
		}
		if(archetype == GRIView.ARCHETYPE_BUTTON_SMALL) {
			var self = button.transform.size;
			self.x = 45;
			self.y = 30;
		}
		button.styleHover = new Style();
		button.styleHover.ninePatch = new NinePatch(4,"button9a",32);
		button.styleHover.color = GRIView.COLOR_TAB_HOVER;
		if(archetype == GRIView.ARCHETYPE_BUTTON_TAB) {
			var self = button.transform.size;
			self.x = 140;
			self.y = 35;
			button.styleHover.ninePatch = null;
			button.style.ninePatch = null;
			button.styleSelected = new Style();
			button.styleSelected.color = GRIView.COLOR_TAB_HOVER;
			button.styleSelected.sprite = new Sprite("tabback",32);
		}
		button.text = label;
		button.styleDisabled = new Style();
		button.styleDisabled.border = 2;
		button.styleDisabled.borderColor = -14997975;
		button.styleDisabled.color = -14997975;
		if(button.styleSelected == null) {
			button.styleSelected = new Style();
			button.styleSelected.color = GRIView.COLOR_TAB_HOVER;
			button.styleSelected.ninePatch = new NinePatch(4,"buttonselec9a",32);
		}
		if(tag != null) {
			button.tags.push(tag);
		}
		if(layoutId != null) {
			this.uiCreation.addElementInLayoutId(button,layoutId);
		} else {
			this.uiCreation.addElement(button);
		}
		return button;
	}
	,__class__: GRIView
};
var StatView = function() {
};
StatView.__name__ = "StatView";
StatView.prototype = {
	__class__: StatView
};
var StatViewCreatorGRI = function() { };
StatViewCreatorGRI.__name__ = "StatViewCreatorGRI";
StatViewCreatorGRI.create = function(griView,layoutId,withIcon) {
	if(withIcon == null) {
		withIcon = false;
	}
	var uiCreation = griView.uiCreation;
	var headerX = 3;
	if(withIcon) {
		headerX += 13;
	}
	var sv = new StatView();
	sv.parent = UICreation.createEmptyElement(275,14);
	sv.parent.style.fill = true;
	sv.parent.style.color = 131586;
	sv.headerText = griView.addText("","Header",GRIView.ARCHETYPE_HEADER_STAT,null);
	var self = sv.headerText.transform.size;
	self.x = 160;
	self.y = 12;
	var self = sv.headerText.textPivot;
	self.x = 0;
	self.y = 0.5;
	sv.statText = griView.addText("","998","statvalue",null);
	var self = sv.statText.transform.size;
	self.x = 50;
	self.y = 12;
	var self = sv.statText.textPivot;
	self.x = 1;
	self.y = 0.5;
	sv.statTextAfter = griView.addText("","999","statvalueafter",null);
	var self = sv.statTextAfter.transform.size;
	self.x = 0;
	self.y = 12;
	var self = sv.statTextAfter.textPivot;
	self.x = 1;
	self.y = 0.5;
	if(withIcon) {
		sv.headerIcon = griView.uiCreation.createImageElement(null,11,11);
	}
	uiCreation.addElementInLayoutId(sv.parent,layoutId);
	uiCreation.addWithOffset(sv.headerText,sv.parent,0,0.5,headerX,0);
	uiCreation.addWithOffset(sv.statText,sv.parent,0,0.5,180,0);
	uiCreation.addWithOffset(sv.statTextAfter,sv.parent,0,0.5,270,0);
	if(sv.headerIcon != null) {
		uiCreation.addWithOffset(sv.headerIcon,sv.parent,0,0.5,3,0);
	}
	return sv;
};
var ActorView = function(layoutId) {
	this.stats = [];
	this.layoutId = layoutId;
};
ActorView.__name__ = "ActorView";
ActorView.prototype = {
	__class__: ActorView
};
var ActorViewLogic = function() { };
ActorViewLogic.__name__ = "ActorViewLogic";
ActorViewLogic.feed = function(actor,actorView,griView,afterStats) {
	var uiCreation = griView.uiCreation;
	var statPos = 0;
	var h = actor.attributesCalculated.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var attr = _g1_value;
		if(ActorViewLogic.ignoredStats.indexOf(key1) != -1) {
			continue;
		}
		var badStat = -103213;
		var afterStat = badStat;
		if(afterStats != null && Object.prototype.hasOwnProperty.call(afterStats.h,key1)) {
			afterStat = afterStats.h[key1];
		}
		if(attr == 0 && (afterStat == badStat || afterStat == 0)) {
			continue;
		}
		while(statPos >= actorView.stats.length) {
			var sv = StatViewCreatorGRI.create(griView,actorView.layoutId);
			actorView.stats.push(sv);
		}
		var sv1 = actorView.stats[statPos];
		sv1.headerText.text = key1;
		sv1.statText.text = "" + attr;
		sv1.headerText.visible = true;
		sv1.statText.visible = true;
		sv1.statTextAfter.visible = attr != afterStat && afterStat != badStat;
		if(Object.prototype.hasOwnProperty.call(ActorViewLogic.AttributeExplanation.h,key1)) {
			griView.ui.hover.setHoverGeneric(sv1.parent,key1,ActorViewLogic.AttributeExplanation.h[key1]);
		} else {
			griView.ui.hover.removeHover(sv1.parent);
		}
		if(sv1.statTextAfter.visible) {
			sv1.statTextAfter.text = "" + afterStat;
			if(attr > afterStat) {
				sv1.statTextAfter.style.color = 13245982;
			} else {
				sv1.statTextAfter.style.color = 11004149;
			}
		}
		++statPos;
	}
	var _g = statPos;
	var _g1 = actorView.stats.length;
	while(_g < _g1) {
		var i = _g++;
		var sv = actorView.stats[i];
		actorView.stats[i].headerText.visible = false;
		actorView.stats[i].statText.visible = false;
		actorView.stats[i].statTextAfter.visible = false;
		griView.ui.hover.removeHover(sv.parent);
	}
};
var CurrencyView = function() {
	this.currencies = [];
};
CurrencyView.__name__ = "CurrencyView";
CurrencyView.prototype = {
	__class__: CurrencyView
};
var CurrencyViewLogic = function() { };
CurrencyViewLogic.__name__ = "CurrencyViewLogic";
CurrencyViewLogic.update = function(view,viewGRI,bm) {
	var layoutId = view.layoutId;
	var currencyPos = 0;
	var h = bm.wdata.currency.currencies.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var value = _g1_value;
		while(view.currencies.length < currencyPos + 1) view.currencies.push(StatViewCreatorGRI.create(viewGRI,layoutId,true));
		view.currencies[currencyPos].headerText.text = key1;
		view.currencies[currencyPos].statText.text = value.value + "";
		view.currencies[currencyPos].statTextAfter.text = "";
		view.currencies[currencyPos].headerIcon.style.sprite = CurrencyViewLogic.currencyToSprite.h[key1];
		view.currencies[currencyPos].headerIcon.style.color = view.currencies[currencyPos].headerText.style.color;
		++currencyPos;
	}
};
var GRIViewEquip = function(view) {
	this.equipment_MaxNumberPage = 1;
	this.equipment_CurrentPage = 0;
	this.hover_tag = "equiphover";
	this.hover_Texts = [];
	this.equippedViews = [];
	this.equipmentViews = [];
	this.view = view;
};
GRIViewEquip.__name__ = "GRIViewEquip";
GRIViewEquip.prototype = {
	setup: function() {
		this.scroll = this.view.uiCreation.addScrollToLayout(GRIViewEquip.layoutIdEquip);
		this.actorEquipView = new ActorView("equipactorview");
		this.currencyView = new CurrencyView();
		this.currencyView.layoutId = "equipcurrencyview";
		this.view.uiCreation.tags.push(this.hover_tag);
		this.view.uiCreation.activeLayer = GRIView.LAYER_HOVER;
		this.view.backgroundElement(GRIViewEquip.layoutIdEquipHover,GRIView.ARCHETYPE_BG_DEFAULT);
		this.hover_Header = this.view.addText("hoverheader","HEADER",GRIView.ARCHETYPE_HEADER_HOVER,GRIViewEquip.layoutIdEquipHover,GRIViewEquip.layoutIdEquipHover);
		this.view.ui.genUI.fitWidthOfLayout(this.hover_Header,GRIViewEquip.layoutIdEquipHover);
		HxOverrides.remove(this.view.uiCreation.tags,this.hover_tag);
		this.view.uiCreation.activeLayer = GRIView.LAYER_DEFAULT;
		this.view.addButton(GRIViewEquip.DATA_EQUIP,"Equip",null,GRIViewEquip.LAYOUT_EQUIP_BUTTON_MISC);
		this.view.addButton(GRIViewEquip.DATA_SELL,"Sell",null,GRIViewEquip.LAYOUT_EQUIP_BUTTON_MISC);
		this.view.addButton(GRIViewEquip.DATA_SELL_WORSE,"Sell worse equipment",null,GRIViewEquip.LAYOUT_EQUIP_BUTTON_MISC);
		this.view.addButton(GRIViewEquip.DATA_UPGRADE,"Upgrade",null,GRIViewEquip.LAYOUT_EQUIP_BUTTON_MISC);
	}
	,equipmentTags: function() {
		this.view.uiCreation.tags.length = 0;
		this.view.uiCreation.tags.push(GRIView.tagTabEquip);
	}
	,feedEquipmentTypeNames: function(equipTypeNames) {
		this.equipmentTags();
		var _g = 0;
		var _g1 = equipTypeNames.length;
		while(_g < _g1) {
			var i = _g++;
			var e = this.view.addButton(GRIViewEquip.equippedViewIdPart + i,equipTypeNames[i],"equipbutton","equippedbuttons");
			e.data.intData = i;
			this.equippedViews.push({ mainName : e, mainButton : e, specialElementIcon : null, specialHeader : null, specialElementText : null, tag : GRIViewEquip.equippedViewIdPart + i});
		}
	}
	,isSelected: function(absoluteEquipPos) {
		var fixedPos = this.EquipmentPosPageFix(absoluteEquipPos);
		if(fixedPos >= 0) {
			var equipV = this.equipmentViews[fixedPos];
			return equipV.mainButton.hovered.state;
		}
		return false;
	}
	,hoverOn: function(absoluteEquipPos) {
		var fixedPos = this.EquipmentPosPageFix(absoluteEquipPos);
		if(fixedPos >= 0) {
			var equipV = this.equipmentViews[fixedPos];
			this.view.ui.genUI.layoutAsHover(equipV.mainButton,GRIViewEquip.layoutIdEquipHover);
		}
		this.view.ui.tagVisibility(GRIViewEquip.layoutIdEquipHover,fixedPos >= 0);
	}
	,setEquipmentHoverInfo: function(text,pos) {
		this.view.uiCreation.tags.length = 0;
		while(this.hover_Texts.length <= pos) {
			this.equipmentTags();
			this.view.uiCreation.tags.push(this.hover_tag);
			this.view.uiCreation.activeLayer = GRIView.LAYER_HOVER;
			var e = this.view.addText("","Attr",GRIView.ARCHETYPE_IMPORTANT_TIMID,GRIViewEquip.layoutIdEquipHover,GRIViewEquip.layoutIdEquipHover);
			this.view.ui.genUI.fitWidthOfLayout(e,GRIViewEquip.layoutIdEquipHover);
			this.view.uiCreation.activeLayer = GRIView.LAYER_DEFAULT;
			this.hover_Texts.push(e);
		}
		var e = this.hover_Texts[pos];
		e.visible = true;
		e.text = text;
		console.log("Sources\GRI/GRIViewEquip.hx:123:",e.text);
		this.view.uiCreation.tags.length = 0;
	}
	,endEquipmentHoverInfo: function(pos) {
		var _g = pos;
		var _g1 = this.hover_Texts.length;
		while(_g < _g1) {
			var i = _g++;
			this.hover_Texts[i].visible = false;
		}
		console.log("Sources\GRI/GRIViewEquip.hx:131:",pos);
	}
	,feedEquipment: function(equipId,absoluteEquipPos,equipmentName,selected) {
		var fixedPos = this.EquipmentPosPageFix(absoluteEquipPos);
		if(fixedPos >= 0) {
			while(this.equipmentViews.length <= fixedPos) {
				this.equipmentTags();
				var viewTag = "equipview_" + this.equipmentViews.length;
				this.view.uiCreation.tags.push(viewTag);
				var element = this.view.addButton(GRIViewEquip.equipmentViewIdPart + this.equipmentViews.length,"Equipment","equipbutton",GRIViewEquip.layoutIdEquip);
				var specialHeader;
				var specialHeaderText;
				var specialHeaderIcon;
				this.view.uiCreation.tags.push(GRIViewEquip.TAG_EQUIPBUTTON_SPECIALWIDGET);
				var e = new UIElement();
				e.style.fill = true;
				e.style.color = GRIView.COLOR_BACKGROUND_GRAY;
				var self = e.transform.size;
				self.x = 100;
				self.y = 20;
				e.mask = this.scroll.viewport.transform;
				this.view.uiCreation.addWithOffset(e,element,0,0,130,-10);
				var e1 = new UIElement();
				e1.text = "Sell:";
				var self1 = e1.textPivot;
				self1.x = 0;
				self1.y = 0;
				var self2 = e1.transform.size;
				self2.x = 100;
				self2.y = 20;
				e1.mask = this.scroll.viewport.transform;
				this.view.uiCreation.addWithOffset(e1,element,0,0,135,-10);
				specialHeader = e1;
				var e2 = new UIElement();
				e2.text = "-10";
				var self3 = e2.textPivot;
				self3.x = 1;
				self3.y = 0;
				var self4 = e2.transform.size;
				self4.x = 100;
				self4.y = 20;
				e2.mask = this.scroll.viewport.transform;
				this.view.uiCreation.addWithOffset(e2,element,0,0,115,-10);
				specialHeaderText = e2;
				var e3 = new UIElement();
				var self5 = e3.transform.size;
				self5.x = 11;
				self5.y = 11;
				e3.style.fill = true;
				var self6 = e3.textPivot;
				self6.x = 1;
				self6.y = 0;
				e3.mask = this.scroll.viewport.transform;
				e3.style.color = 11184810;
				this.view.uiCreation.addWithOffset(e3,element,0,0,217,-8);
				specialHeaderIcon = e3;
				this.equipmentViews.push({ mainName : element, mainButton : element, specialElementIcon : specialHeaderIcon, specialElementText : specialHeaderText, specialHeader : specialHeader, tag : viewTag});
				this.equipmentTags();
			}
			var equipV = this.equipmentViews[fixedPos];
			this.feedEquipmentView(equipId,equipmentName,equipV);
			equipV.mainButton.selected = selected;
		}
	}
	,visibilityOfEquipViewCutoff: function(cutOffIndex) {
		var _g_current = 0;
		var _g_array = this.equipmentViews;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			this.view.ui.tagVisibility(value.tag,index < cutOffIndex);
		}
	}
	,feedEquipped: function(equipId,equippedPos,equipmentName,selected) {
		var fixedPos = equippedPos;
		if(fixedPos >= 0) {
			var equipV = this.equippedViews[fixedPos];
			equipV.mainButton.selected = selected;
			this.feedEquipmentView(fixedPos,equipmentName,equipV);
		}
	}
	,feedEquipmentView: function(intData,equipmentName,equipV) {
		equipV.mainName.text = equipmentName;
		equipV.mainButton.data.intData = intData;
	}
	,EquipmentPosPageFix: function(absolutepos) {
		var minPos = this.equipment_CurrentPage * GRIViewEquip.equipment_MaxInPage;
		var maxPos = (this.equipment_CurrentPage + 1) * GRIViewEquip.equipment_MaxInPage;
		if(absolutepos < minPos || absolutepos >= maxPos) {
			return -1;
		}
		var pos = absolutepos - minPos;
		return pos;
	}
	,__class__: GRIViewEquip
};
var GRIRegionInfo = function() { };
GRIRegionInfo.__name__ = "GRIRegionInfo";
var GRIViewRegion = function(view) {
	this.scrolls = [];
	this.areaButtons = new ArrayOfArray();
	this.regionButtons = new ArrayOfArray();
	this.view = view;
};
GRIViewRegion.__name__ = "GRIViewRegion";
GRIViewRegion.prototype = {
	setup: function() {
		this.scrolls.push(this.view.uiCreation.addScrollToLayout(GRIViewRegion.LAYOUT_REGION_AREAS));
	}
	,feedRegionButtons: function(feed) {
		this.regionButtons.adjustLength(feed.feedLists.length * 2);
		this.view.uiCreation.singleTag(GRIView.tagTabRegion);
		var _g_current = 0;
		var _g_array = feed.feedLists;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var dataIndex = _g1_key;
			var feedlist = _g1_value;
			var viewIndex = dataIndex * 2;
			var elementViewIndex = viewIndex + 1;
			this.regionButtons.adjustLengthOfList(elementViewIndex,feedlist.feedList.length);
			var _g2_current = 0;
			var _g2_array = feedlist.feedList;
			while(_g2_current < _g2_array.length) {
				var _g3_value = _g2_array[_g2_current];
				var _g3_key = _g2_current++;
				var elementIndex = _g3_key;
				var element = _g3_value;
				var eb = this.regionButtons.getElement(elementViewIndex,elementIndex);
				if(eb == null) {
					eb = this.regionButtons.setElement(elementViewIndex,elementIndex,this.view.addButton("","",GRIView.ARCHETYPE_BUTTON_SMALL_LABEL,null,null));
				}
				this.view.ui.feedElement(eb,element);
			}
		}
		this.view.ui.genUI.arraysToLayout(this.regionButtons,GRIViewRegion.LAYOUT_REGION_REGIONS);
	}
	,feedAreaButtons: function(feed) {
		var buttons = this.areaButtons;
		buttons.adjustLength(feed.feedLists.length * 2);
		this.view.uiCreation.singleTag(GRIView.tagTabRegion);
		var _g_current = 0;
		var _g_array = feed.feedLists;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var dataIndex = _g1_key;
			var feedlist = _g1_value;
			var viewIndex = dataIndex * 2;
			var elementViewIndex = viewIndex + 1;
			buttons.adjustLengthOfList(elementViewIndex,feedlist.feedList.length);
			var _g2_current = 0;
			var _g2_array = feedlist.feedList;
			while(_g2_current < _g2_array.length) {
				var _g3_value = _g2_array[_g2_current];
				var _g3_key = _g2_current++;
				var elementIndex = _g3_key;
				var element = _g3_value;
				var eb = buttons.getElement(elementViewIndex,elementIndex);
				if(eb == null) {
					eb = buttons.setElement(elementViewIndex,elementIndex,this.view.addButton("","",GRIView.ARCHETYPE_BUTTON_SMALL_LABEL,null,null));
				}
				this.view.ui.feedElement(eb,element);
			}
		}
		this.view.ui.genUI.arraysToLayout(buttons,GRIViewRegion.LAYOUT_REGION_AREAS);
		var _g = 0;
		var _g1 = this.scrolls;
		while(_g < _g1.length) {
			var scroll = _g1[_g];
			++_g;
			this.view.ui.extendElementHeight(scroll.viewport,95);
		}
	}
	,__class__: GRIViewRegion
};
var GRIViewTitle = function() {
};
GRIViewTitle.__name__ = "GRIViewTitle";
GRIViewTitle.prototype = {
	setupUI: function() {
		this.view.uiCreation.singleTag(GRIView.tagTabTitle);
		this.view.addButton(GRIViewTitle.DATA_CONTINUE,"Continue",null,GRIViewTitle.LAYOUT_BUTTON_TITLE);
		this.view.addButtonImage("discord",Sprite.create("discord",91,31),null,GRIViewTitle.LAYOUT_BUTTON_TITLE,null,false,91,31);
		var steamButton = this.view.addButton(GRIViewTitle.DATA_STEAM,"",null,GRIViewTitle.LAYOUT_BUTTON_TITLE);
		var self = steamButton.transform.size;
		self.x = steamButton.transform.size.x;
		self.y = 60;
		var img = this.view.uiCreation.createImageElement(Sprite.create("steam",81,24),81,24);
		this.view.uiCreation.addWithOffset(img,steamButton,0.5,0.5,0,8);
		var text = this.view.addText("","Wishlist now",GRIView.ARCHETYPE_TEXT_ACTION,null,null,false);
		this.view.uiCreation.addWithOffset(text,steamButton,0.5,0.5,0,-14);
		this.view.addButton(GRIViewTitle.DATA_RESET,"Reset",null,GRIViewTitle.LAYOUT_BUTTON_TITLE);
		var logo = this.view.uiCreation.createImageElement(Sprite.create("logo",420,360),420,360);
		this.view.uiCreation.addElementInLayoutId(logo,"titlelogo");
	}
	,__class__: GRIViewTitle
};
var GenUIIntegration = function() {
	this.layoutIntegs = new haxe_ds_StringMap();
};
GenUIIntegration.__name__ = "GenUIIntegration";
GenUIIntegration.prototype = {
	updateAll: function() {
		var h = this.layoutIntegs.h;
		var manager_h = h;
		var manager_keys = Object.keys(h);
		var manager_length = manager_keys.length;
		var manager_current = 0;
		while(manager_current < manager_length) {
			var manager = manager_h[manager_keys[manager_current++]];
			this.update(manager);
		}
	}
	,updateWithScroll: function(manager) {
		var yScroll = 0;
		if(manager.scroll != null) {
			yScroll = manager.scroll.offset.y;
			var self = manager.scroll.offset;
			self.x = 0;
			self.y = 0;
		}
		this.update(manager);
		if(manager.scroll != null) {
			UIScrollLogic.recalculateContentRect(manager.scroll);
			var self = manager.scroll.viewport.transform.position;
			self.x = manager.layout.element.x;
			self.y = manager.layout.element.y;
			manager.scroll.viewport.transform.size.x = manager.scroll.content.width;
			manager.scroll.offset.y = yScroll;
			this.update(manager);
		}
	}
	,update: function(manager) {
		var layout = manager.layout;
		var x = layout.element.x;
		var y = layout.element.y;
		var yoffset = 0;
		if(manager.scroll != null) {
			yoffset += manager.scroll.offset.y;
		}
		var lx = 999999;
		var ly = 999999;
		var lxm = -10;
		var lym = -10;
		var _g_current = 0;
		var _g_array = manager.elements;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			if(layout.horizontal) {
				if(value.transform.size.x + x > layout.element.width + layout.element.x && layout.element.width > 0) {
					x = layout.element.x;
					y += value.transform.size.y + layout.separationY;
				}
			} else if(value.transform.size.y + y > layout.element.height + layout.element.y && layout.element.height > 0) {
				y = layout.element.y;
				x += value.transform.size.x + layout.separationX;
			}
			value.transform.position.x = x + layout.element.screenPivotX * Renderer.width - layout.element.screenPivotX * layout.element.width - layout.childPivotX * value.transform.size.x;
			value.transform.position.y = y + layout.element.screenPivotY * Renderer.height - layout.element.screenPivotY * layout.element.height - layout.childPivotY * value.transform.size.y + yoffset;
			var tX = value.transform.position.x;
			var tY = value.transform.position.y;
			var _this = value.transform;
			var tXm = _this.position.x + _this.size.x;
			var _this1 = value.transform;
			var tYm = _this1.position.y + _this1.size.y;
			if(lx > tX) {
				lx = tX;
			}
			if(ly > tY) {
				ly = tY;
			}
			if(lxm < tXm) {
				lxm = tXm;
			}
			if(lym < tYm) {
				lym = tYm;
			}
			if(layout.horizontal) {
				x += value.transform.size.x + layout.separationX;
			} else {
				y += value.transform.size.y + layout.separationY;
			}
		}
		if(manager.bgElement != null) {
			if(manager.bgFitChildren) {
				var self = manager.bgElement.transform.position;
				self.x = lx;
				self.y = ly;
				var self = manager.bgElement.transform.size;
				self.x = lxm - lx;
				self.y = lym - ly;
				if(manager.margin != null) {
					var self = manager.bgElement.transform.position;
					self.x = lx - manager.margin.x;
					self.y = ly - manager.margin.y;
					var self = manager.bgElement.transform.size;
					self.x = lxm - lx + manager.margin.width + manager.margin.height;
					self.y = lym - ly + manager.margin.height + manager.margin.y;
				}
			} else {
				var self = manager.bgElement.transform.position;
				self.x = layout.element.x;
				self.y = layout.element.y;
				var self = manager.bgElement.transform.size;
				self.x = layout.element.width;
				self.y = layout.element.height;
			}
		}
	}
	,readUIMaster: function(json) {
		this.genMaster = JSON.parse(json);
		this.genMasterAccess = new GenMasterAccess(this.genMaster);
	}
	,extendLayoutWidth: function(layoutId,leeway) {
		var li = this.getLayout(layoutId);
		li.layout.element.width = Renderer.width - li.layout.element.x - leeway;
		this.updateWithScroll(li);
	}
	,fitWidthOfLayout: function(e,layoutId) {
		var li = this.getLayout(layoutId);
		e.transform.size.x = li.layout.element.width;
		this.updateWithScroll(li);
	}
	,layoutAsHover: function(e,layoutId) {
		var li = this.getLayout(layoutId);
		var _this = e.transform;
		li.layout.element.x = _this.position.x + _this.size.x | 0;
		li.layout.element.y = e.transform.position.y | 0;
		if(li.margin != null) {
			var _this = e.transform;
			li.layout.element.x = _this.position.x + _this.size.x + li.margin.x + 10 | 0;
		}
		this.updateWithScroll(li);
	}
	,getLayout: function(layoutId) {
		var li = this.layoutIntegs.h[layoutId];
		if(li == null) {
			li = new LayoutIntegManager();
			this.layoutIntegs.h[layoutId] = li;
			li.layout = this.genMasterAccess.getLinearLayout(layoutId);
		}
		return li;
	}
	,addScrollToLayout: function(layoutId) {
		var li = this.getLayout(layoutId);
		var scroll = new UIScroll(li.elements);
		scroll.positionElements = false;
		scroll.viewport = new UIElement();
		scroll.viewport.id = layoutId + "-scroll";
		li.scroll = scroll;
		return scroll;
	}
	,addElementToLayout: function(uiElement,layoutId) {
		var li = this.getLayout(layoutId);
		li.elements.push(uiElement);
		this.updateWithScroll(li);
	}
	,arraysToLayout: function(uiElement,layoutId) {
		var li = this.getLayout(layoutId);
		li.elements.length = 0;
		var _g = 0;
		var _g1 = uiElement.arrays;
		while(_g < _g1.length) {
			var array = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < array.length) {
				var element = array[_g2];
				++_g2;
				li.elements.push(element);
			}
		}
		this.updateWithScroll(li);
	}
	,__class__: GenUIIntegration
};
var LayoutIntegManager = function() {
	this.elements = [];
};
LayoutIntegManager.__name__ = "LayoutIntegManager";
LayoutIntegManager.prototype = {
	__class__: LayoutIntegManager
};
var HxOverrides = function() { };
HxOverrides.__name__ = "HxOverrides";
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var ImageManager = function() { };
ImageManager.__name__ = "ImageManager";
ImageManager.registerImage = function(imageId) {
	var image = window.document.getElementById(imageId);
	if(image == null) {
		console.log("Sources\JS/ImageManager.hx:13:","image not found");
		window.alert(Std.string(imageId + " image element not found. Check ID in index.html"));
	}
	ImageManager.images.h[imageId] = image;
};
var Mouse = function() {
	this.mousePressed = new BoolProperty();
	this.mouseMoved = new Vector2Default(-1,-1);
	this.mousePositionLastFrame = new Vector2Default(-1,-1);
	this.mousePosition = new Vector2Default(-1,-1);
};
Mouse.__name__ = "Mouse";
Mouse.prototype = {
	__class__: Mouse
};
var Keyboard = function() {
};
Keyboard.__name__ = "Keyboard";
Keyboard.prototype = {
	__class__: Keyboard
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var JSKeyboard = function() {
	this.charsUp = [];
	this.charsPressed = [];
	this.charsDown = [];
	var _gthis = this;
	window.document.onkeydown = function(ev) {
		var eve = ev;
		if(eve.key.length == 1) {
			var charCode = eve.key.charCodeAt(0);
			_gthis.charsDown.push(charCode);
			if(_gthis.charsPressed.indexOf(charCode) != -1 == false) {
				_gthis.charsPressed.push(charCode);
			}
		}
	};
	window.document.onkeyup = function(ev) {
		var eve = ev;
		if(eve.key.length == 1) {
			var charCode = eve.key.charCodeAt(0);
			_gthis.charsUp.push(charCode);
			HxOverrides.remove(_gthis.charsPressed,charCode);
		}
	};
};
JSKeyboard.__name__ = "JSKeyboard";
JSKeyboard.prototype = {
	__class__: JSKeyboard
};
var JSMouse = function() {
	this.pressed = false;
	this.y = 0;
	this.x = 0;
	var _gthis = this;
	window.document.onmousemove = function(ev) {
		var me = ev;
		_gthis.x = me.pageX;
		return _gthis.y = me.pageY;
	};
	window.document.onmousedown = function(ev) {
		return _gthis.pressed = true;
	};
	window.document.onmouseup = function(ev) {
		return _gthis.pressed = false;
	};
};
JSMouse.__name__ = "JSMouse";
JSMouse.prototype = {
	__class__: JSMouse
};
var Main = function() { };
Main.__name__ = "Main";
Main.main = function() {
	Main.start_game();
};
Main.start_game = function() {
	var physics = { arcade : { gravity : { y : 0}, debug : false}};
	physics["default"] = "arcade";
	var config = { parent : "game_canvas", physics : physics, width : window.innerWidth, height : window.innerHeight, backgroundColor : "#0f1522", pixelArt : true, scene : [PlayScene]};
	new Phaser.Game(config);
};
var ImageRunner = function() {
	this.index = 0;
	this.images = [];
};
ImageRunner.__name__ = "ImageRunner";
ImageRunner.prototype = {
	__class__: ImageRunner
};
var PhaserRenderer = function() { };
PhaserRenderer.__name__ = "PhaserRenderer";
PhaserRenderer.startFrame = function() {
	PhaserRenderer.z = 0;
	var h = PhaserRenderer.images.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var value = _g1_value;
		value.index = 0;
		var _g = 0;
		var _g1 = value.images;
		while(_g < _g1.length) {
			var image = _g1[_g];
			++_g;
			image.visible = false;
		}
	}
};
PhaserRenderer.getImage = function(imageId) {
	var ir = PhaserRenderer.images.h[imageId];
	if(ir == null) {
		ir = new ImageRunner();
		PhaserRenderer.images.h[imageId] = ir;
	}
	while(ir.images.length <= ir.index) {
		var im = PhaserRenderer.scene.add.image(0,0,imageId);
		im.originX = 0;
		im.originY = 0;
		ir.images.push(im);
	}
	var image = ir.images[ir.index];
	ir.index++;
	image.visible = true;
	return image;
};
PhaserRenderer.drawImage = function(imageId,sx,sy,sw,sh,dx,dy,dw,dh,alpha,color) {
	if(color == null) {
		color = 16777215;
	}
	if(alpha == null) {
		alpha = 1;
	}
	var im = PhaserRenderer.getImage(imageId);
	im.tint = color;
	im.alpha = alpha;
	im.scaleX = dw / sw;
	im.scaleY = dh / sh;
	im.setDepth(PhaserRenderer.z);
	PhaserRenderer.z++;
	if(dw == sw && dh == sh) {
		im.setScale(1,1);
	} else {
		im.setScale(im.scaleX,im.scaleY);
	}
	im.setCrop(sx,sy,sw,sh);
	var fy = im.height - sy * 2;
	im.x = dx + (im.width - sx * 2) * im.scaleX / 2;
	im.y = dy + fy * im.scaleY / 2;
	im.x = im.x | 0;
	im.y = im.y | 0;
};
var Pivot = function() { };
Pivot.__name__ = "Pivot";
Pivot.calculateDimension = function(pivotS,pivotD,dimensionS,dimensionD) {
	return -pivotS * dimensionS + dimensionD * pivotD;
};
var PlayScene = function(config) {
	this.saveCount = 5;
	this.saveFileImporterSetup = false;
	this.griControl = new GRIControl();
	Phaser.Scene.call(this,config);
};
PlayScene.__name__ = "PlayScene";
PlayScene.__super__ = Phaser.Scene;
PlayScene.prototype = $extend(Phaser.Scene.prototype,{
	create: function() {
		Renderer.width = this.sys.canvas.width;
		Renderer.height = this.sys.canvas.height;
		BitmapText.loadFont("main","font12_0",haxe_Resource.getString("font12_fnt"));
		BitmapText.loadFont("main14","font14_0",haxe_Resource.getString("font14_fnt"));
		BitmapText.loadFont("main16","font16_0",haxe_Resource.getString("font16_fnt"));
		var genui = new GenUIIntegration();
		genui.readUIMaster(haxe_Resource.getString("uigen_txt"));
		this.griControl.view.ui.genUI = genui;
		this.griControl.setupTitle();
		this.engineMouse = new JSMouse();
		this.engineKeyboard = new JSKeyboard();
		var key = Keyboard.keyboard;
		key.charsDown = this.engineKeyboard.charsDown;
		key.charsPressed = this.engineKeyboard.charsPressed;
		key.charsUp = this.engineKeyboard.charsUp;
		PhaserRenderer.scene = this;
		this.graphics = this.add.graphics();
		FileAccessJS.createImportElement();
	}
	,preload: function() {
		this.load.image("button9a","Assets/button9a.png");
		this.load.image("buttonselec9a","Assets/buttonselec9a.png");
		this.load.image("Unnamed_0","Assets/Unnamed_0.png");
		this.load.image("font12_0","Assets/font12_0.png");
		this.load.image("font14_0","Assets/font14_0.png");
		this.load.image("font16_0","Assets/font16_0.png");
		this.load.image("whitep","Assets/whitedot.png");
		this.load.image("greengradient","Assets/greengradient.png");
		this.load.image("bluegradient","Assets/bluegradient.png");
		this.load.image("pinkgradient","Assets/pinkgradient.png");
		this.load.image("arrowleft","Assets/arrowleft.png");
		this.load.image("arrowup","Assets/arrowup.png");
		this.load.image("arrowdown","Assets/arrowdown.png");
		this.load.image("arrowrepeat","Assets/arrowrepeat.png");
		this.load.image("tabback","Assets/tabback.png");
		this.load.image("boot","Assets/boot.png");
		this.load.image("leaf","Assets/leaf.png");
		this.load.image("shield","Assets/shield.png");
		this.load.image("skull","Assets/skull.png");
		this.load.image("steam","Assets/steamlogob.png");
		this.load.image("discord","Assets/discordb.png");
		this.load.image("circle","Assets/circle.png");
		this.load.image("logo","Assets/logo.png");
		this.load.image("boss","Assets/boss.png");
		this.load.image("bossb","Assets/bossb.png");
		this.load.image("enemyicon","Assets/enemyicon.png");
		this.load.image("heroicon","Assets/heroicon.png");
	}
	,update: function(time,delta) {
		var mouse = Mouse.mouse;
		mouse.mousePressed.startFrame();
		mouse.mousePressed.state = this.engineMouse.pressed;
		var target = mouse.mousePositionLastFrame;
		var self = mouse.mousePosition;
		var self1 = self;
		var value = self1.x;
		var self1 = target;
		self1.x = value;
		var self1 = self;
		var value = self1.y;
		var self = target;
		self.y = value;
		var self = mouse.mousePosition;
		self.x = this.engineMouse.x;
		self.y = this.engineMouse.y;
		var self = mouse.mouseMoved;
		self.x = mouse.mousePosition.x - mouse.mousePositionLastFrame.x;
		self.y = mouse.mousePosition.y - mouse.mousePositionLastFrame.y;
		this.griControl.update(16);
		PhaserRenderer.startFrame();
		this.griControl.render();
		this.saveFileImporterSetup = this.updateImportExport(this.saveFileImporterSetup);
		this.saveCount -= delta;
		if(this.saveCount < 0) {
			FileAccessJS.feedSave(CrossTarget.latestSave);
			this.saveCount = 5;
		}
		FileAccessJS.saveImportVisibility(this.griControl.view.currentTab == GRIView.tagTabTitle);
	}
	,updateImportExport: function(saveFileImporterSetup) {
		var _gthis = this;
		var imp = window.document.getElementById("import__");
		if(imp != null && saveFileImporterSetup == false) {
			if(imp != null) {
				var input = imp;
				input.onchange = function(event) {
					FileUtilities.ReadFile(input.files[0],function(json) {
						if(_gthis.griControl != null) {
							CrossTarget.SetLocalStorageItem(GRIControl.keyBackup,_gthis.griControl.battleManager.GetJsonPersistentData());
						} else {
							CrossTarget.SetLocalStorageItem(GRIControl.keyBackup,CrossTarget.GetLocalStorageItem(GRIControl.key));
						}
						CrossTarget.SetLocalStorageItem(GRIControl.key,json);
						CrossTarget.reload();
						_gthis.griControl = null;
					});
				};
				saveFileImporterSetup = true;
			}
		}
		return saveFileImporterSetup;
	}
	,__class__: PlayScene
});
var EnemyAreaInformation = function() {
	this.viewOverride = -1;
	this.tags = [];
	this.equipment = [];
};
EnemyAreaInformation.__name__ = "EnemyAreaInformation";
EnemyAreaInformation.prototype = {
	__class__: EnemyAreaInformation
};
var EnemyAreaFromProceduralUnitRepetition = function() {
	this.aux = new EnemyAreaInformation();
	this.equipments = [];
	this.enemySheets = [];
};
EnemyAreaFromProceduralUnitRepetition.__name__ = "EnemyAreaFromProceduralUnitRepetition";
EnemyAreaFromProceduralUnitRepetition.prototype = {
	GetProceduralUnitRepeated: function(area) {
		area %= this.units.length;
		var u = this.units[area];
		return u;
	}
	,GetEnemyAreaInformation: function(area) {
		var areaOrig = area;
		area %= this.units.length;
		var u = this.units[area];
		var char = u.proceduralUnit.characteristics[0];
		var enemyId = char;
		var es = this.enemySheets[enemyId];
		var extraEquip = null;
		if(es == null) {
			enemyId = u.randomExtra[0] % this.enemySheets.length;
			es = this.enemySheets[enemyId];
		}
		var nEnemies = -1;
		var levelBonus = 0;
		this.aux.viewOverride = 1;
		if(u.position == u.total - 1) {
			nEnemies = 1;
			levelBonus = 1;
			var hpMultiplier = 400;
			var _g = new haxe_ds_StringMap();
			_g.h["LifeMax"] = hpMultiplier;
			extraEquip = { seen : 0, requiredAttributes : null, type : 1, attributes : null, attributeMultiplier : _g};
			extraEquip.attributes = new haxe_ds_StringMap();
			this.aux.viewOverride = 2;
			if(areaOrig > 8) {
				levelBonus = 3;
			}
			if(areaOrig > 15) {
				levelBonus = 5;
				nEnemies = u.randomExtra[1] % 3 + 1;
			}
			if(areaOrig > 20) {
				levelBonus = 15;
			}
			if(areaOrig > 30) {
				levelBonus = 25;
			}
			if(areaOrig > 40) {
				levelBonus = 30;
			}
			if(areaOrig > 50) {
				levelBonus = 40;
			}
		}
		this.aux.sheet = es;
		this.aux.nEnemies = nEnemies;
		this.aux.level = levelBonus;
		this.aux.equipment.length = 0;
		if(this.equipments[char] != null || extraEquip != null) {
			if(this.equipments[char] != null) {
				this.aux.equipment.push(this.equipments[char]);
			}
			if(extraEquip != null) {
				this.aux.equipment.push(extraEquip);
			}
		}
		this.aux.sheetId = enemyId;
		this.aux.equipId = char;
		return this.aux;
	}
	,__class__: EnemyAreaFromProceduralUnitRepetition
};
var PrototypeItemMaker = function() {
	this.mods = [];
	this.items = [];
};
PrototypeItemMaker.__name__ = "PrototypeItemMaker";
PrototypeItemMaker.prototype = {
	R: function(min,max) {
		return { min : min, max : max};
	}
	,MakeItems: function() {
		var _g = new haxe_ds_StringMap();
		_g.h["LifeMax"] = 5;
		this.AddItem("Shirt",PrototypeItemMaker.itemType_Armor,_g);
		var _g = new haxe_ds_StringMap();
		_g.h["LifeMax"] = 3;
		_g.h["Defense"] = 0.6;
		this.AddItem("Vest",PrototypeItemMaker.itemType_Armor,_g);
		var _g = new haxe_ds_StringMap();
		_g.h["Defense"] = 1;
		this.AddItem("Plate",PrototypeItemMaker.itemType_Armor,_g);
		var _g = new haxe_ds_StringMap();
		_g.h["Attack"] = 1;
		this.AddItem("Broad Sword",PrototypeItemMaker.itemType_Weapon,_g);
		var _g = new haxe_ds_StringMap();
		_g.h["Attack"] = 1;
		var _g1 = new haxe_ds_StringMap();
		var value = this.R(115,115);
		_g1.h["Attack"] = value;
		var value = this.R(80,80);
		_g1.h["Speed"] = value;
		var _g2 = new haxe_ds_StringMap();
		_g2.h["Piercing"] = 25;
		this.AddItem("Heavy Sword",PrototypeItemMaker.itemType_Weapon,_g,_g1,_g2);
		var _g = new haxe_ds_StringMap();
		_g.h["Attack"] = 1;
		var _g1 = new haxe_ds_StringMap();
		var value = this.R(150,150);
		_g1.h["Attack"] = value;
		var value = this.R(50,50);
		_g1.h["Speed"] = value;
		var _g2 = new haxe_ds_StringMap();
		_g2.h["Piercing"] = 50;
		this.AddItem("Bastard Sword",PrototypeItemMaker.itemType_Weapon,_g,_g1,_g2);
		var _g = new haxe_ds_StringMap();
		_g.h["Attack"] = 1;
		var _g1 = new haxe_ds_StringMap();
		var value = this.R(70,70);
		_g1.h["Attack"] = value;
		var value = this.R(175,175);
		_g1.h["Speed"] = value;
		this.AddItem("Dagger",PrototypeItemMaker.itemType_Weapon,_g,_g1);
		var _g = new haxe_ds_StringMap();
		var value = this.R(105,110);
		_g.h["Attack"] = value;
		this.AddMod("of the Brute","Barbarian's",_g);
		var _g = new haxe_ds_StringMap();
		var value = this.R(120,150);
		_g.h["Defense"] = value;
		this.AddMod("of the Guardian","Golem's",_g);
		var _g = new haxe_ds_StringMap();
		var value = this.R(115,130);
		_g.h["Speed"] = value;
		this.AddMod("of the Thief","Zidane's",_g);
		var _g = new haxe_ds_StringMap();
		var value = this.R(130,150);
		_g.h["LifeMax"] = value;
		this.AddMod("of Nature","Aerith's",_g);
		var _g = new haxe_ds_StringMap();
		var value = this.R(115,125);
		_g.h["Attack"] = value;
		var value = this.R(70,90);
		_g.h["Defense"] = value;
		this.AddMod("of Rage","Beserker's",_g);
		var _g = new haxe_ds_StringMap();
		var value = this.R(1,5);
		_g.h["Blood"] = value;
		this.AddMod("of Blood","Sanguine",null,_g);
	}
	,AddMod: function(suffix,prefix,statMultipliers,statAdds) {
		this.mods.push({ prefix : prefix, suffix : suffix, statMultipliers : statMultipliers, statAdds : statAdds});
	}
	,AddItem: function(name,type,scalingStats,statMultipliers,statAdd) {
		this.items.push({ name : name, type : type, scalingStats : scalingStats, statMultipliers : statMultipliers, statAdd : statAdd});
	}
	,__class__: PrototypeItemMaker
};
var RandomExtender = function() { };
RandomExtender.__name__ = "RandomExtender";
RandomExtender.Range = function(random,range) {
	return random.randomInt(range.min,range.max);
};
var PrototypeSkillMaker = function() {
	this.skills = [];
};
PrototypeSkillMaker.__name__ = "PrototypeSkillMaker";
PrototypeSkillMaker.prototype = {
	AddSkill: function(id,mpCost) {
	}
	,init: function() {
		this.skills.push({ id : "Regen", profession : "Priest", word : "Nature", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var strength = level * 3;
			var _g = new haxe_ds_StringMap();
			_g.h["Regen"] = strength;
			bm.AddBuff({ uniqueId : "regen", addStats : _g, mulStats : null, strength : strength, duration : 8},array[0]);
		}}], mpCost : 20});
		this.skills.push({ id : "Light Slash", profession : "Warrior", word : "Red", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			var strength = level * 5;
			bm.AttackExecute(actor,array[0],50,5 + level,100);
		}}], turnRecharge : 1, mpCost : 5});
		this.skills.push({ id : "Slash", profession : "Warrior", word : "Red", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			var strength = level * 10;
			bm.AttackExecute(actor,array[0],90 + strength,strength,100);
		}}], turnRecharge : 1, mpCost : 15});
		this.skills.push({ id : "Heavy Slash", profession : "Warrior", word : "Red", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			bm.AttackExecute(actor,array[0],100 + level * 30,level * 15,100);
		}}], turnRecharge : 1, mpCost : 40});
		this.skills.push({ id : "Fogo", profession : "Wizard", word : "Fire", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			bm.AttackExecute(actor,array[0],100 + level * 30,level * 15,100,"fire");
		}}], turnRecharge : 1, mpCost : 10});
		this.skills.push({ id : "Gelo", profession : "Wizard", word : "Ice", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			bm.AttackExecute(actor,array[0],105 + level * 30,level * 15,100,"ice");
		}}], turnRecharge : 1, mpCost : 12});
		this.skills.push({ id : "Raio", profession : "Wizard", word : "Thunder", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			bm.AttackExecute(actor,array[0],100 + level * 25,level * 13,100,"thunder");
		}}], turnRecharge : 1, mpCost : 9});
		this.skills.push({ id : "DeSpell", profession : "Unbuffer", word : "Witchhunt", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			var strength = level * 30;
			bm.RemoveBuffs(array[0]);
		}}], mpCost : 10});
		this.skills.push({ id : "Cure", profession : "Mage", word : "White", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var bonus = 5 + level * 10;
			var strength = level * bonus;
			bm.Heal(array[0],10,bonus);
		}}], mpCost : 15});
		this.skills.push({ id : "Haste", profession : "Wizard", word : "Time", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var bonus = 20;
			var multiplier = 90 + level * 10;
			var _g = new haxe_ds_StringMap();
			_g.h["Speed"] = bonus;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Speed"] = multiplier;
			bm.AddBuff({ uniqueId : "haste", addStats : _g, mulStats : _g1, strength : level, duration : 8},array[0]);
		}}], mpCost : 45});
		this.skills.push({ id : "Bloodlust", profession : "Sanguiner", word : "Blood", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var multiplier = 90 + level * 10;
			var _g = new haxe_ds_StringMap();
			_g.h["Blood"] = 3;
			_g.h["Bloodthirst"] = multiplier;
			bm.AddBuff({ uniqueId : "bloodlust", addStats : _g, mulStats : null, strength : level, duration : 3},array[0]);
		}}], mpCost : 5});
		this.skills.push({ id : "Noblesse", profession : "Highborn", word : "Honour", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var _g = new haxe_ds_StringMap();
			_g.h["Defense"] = 3 + level * 2;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Attack"] = 150 + level * 25;
			bm.AddBuff({ uniqueId : "noblesse", addStats : _g, mulStats : _g1, strength : level, duration : 99, noble : true},array[0]);
		}}], mpCost : 5});
		this.skills.push({ id : "Protect", profession : "Defender", word : "Defense", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var bonus = level * 5;
			var multiplier = 110;
			var _g = new haxe_ds_StringMap();
			_g.h["Defense"] = bonus;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Defense"] = multiplier;
			bm.AddBuff({ uniqueId : "protect", addStats : _g, mulStats : _g1, strength : level, duration : 8},array[0]);
		}}], mpCost : 25});
		this.skills.push({ id : "Sharpen", profession : "Smith", word : "Sharpness", effects : [{ target : Target.SELF, effectExecution : function(bm,level,actor,array) {
			var bonus = 100;
			var multiplier = 100 + 5 * level;
			var _g = new haxe_ds_StringMap();
			_g.h["Piercing"] = bonus;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Attack"] = multiplier;
			bm.AddBuff({ uniqueId : "pierce", addStats : _g, mulStats : _g1, strength : level, duration : 9},array[0]);
		}}], mpCost : 20});
		this.skills.push({ id : "Armor Break", profession : "Breaker", word : "Destruction", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			var _g = new haxe_ds_StringMap();
			_g.h["Defense"] = -level * 10;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Defense"] = 50;
			bm.AddBuff({ uniqueId : "Armor Break", addStats : _g, mulStats : _g1, strength : level, duration : 5, debuff : true},array[0]);
		}}], mpCost : 10});
		this.skills.push({ id : "Attack Break", profession : "Breaker", word : "Destruction", effects : [{ target : Target.ENEMY, effectExecution : function(bm,level,actor,array) {
			var _g = new haxe_ds_StringMap();
			_g.h["Attack"] = -level * 10;
			var _g1 = new haxe_ds_StringMap();
			_g1.h["Attack"] = 50;
			bm.AddBuff({ uniqueId : "Attack Break", addStats : _g, mulStats : _g1, strength : level, duration : 5, debuff : true},array[0]);
		}}], mpCost : 10});
	}
	,__class__: PrototypeSkillMaker
};
var ResourceLogic = function() { };
ResourceLogic.__name__ = "ResourceLogic";
ResourceLogic.recalculateScalingResource = function(base,res) {
	if(res.lastUsedBaseAttribute != base) {
		var data1 = res.scaling.data1;
		var baseValue = res.scaling.initial;
		if(res.scaling.initialMultiplication) {
			baseValue *= base;
		}
		var expBonus = 0;
		if(res.scaling.exponential) {
			expBonus = Math.pow(data1,base);
		}
		var calculated = expBonus + baseValue | 0;
		calculated -= calculated % res.scaling.minimumIncrement;
		res.calculatedMax = calculated;
		res.lastUsedBaseAttribute = base;
	}
};
ResourceLogic.getExponentialResource = function(expBase,minimumIncrement,initial) {
	var res = { scaling : { data1 : expBase, initial : initial, minimumIncrement : minimumIncrement, initialMultiplication : true, exponential : true}, value : 0, lastUsedBaseAttribute : 0, calculatedMax : 0};
	ResourceLogic.recalculateScalingResource(1,res);
	return res;
};
var AttributeLogic = function() { };
AttributeLogic.__name__ = "AttributeLogic";
AttributeLogic.AddOld = function(attributes,attributeAddition,quantityOfAddition) {
	var h = attributes.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var value = _g1_value;
		var _g = key1;
		var _g1 = attributes;
		var v = _g1.h[_g] + (attributeAddition.h[key1] * quantityOfAddition | 0);
		_g1.h[_g] = v;
	}
};
AttributeLogic.Add = function(attributes,attributeAddition,quantityOfAddition,result) {
	var h = attributes.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var value = _g1_value;
		var addedValue = attributeAddition.h[key1];
		if(addedValue >= 0 == false && addedValue < 0 == false) {
			addedValue = 0;
		}
		var v = value + (addedValue * quantityOfAddition | 0);
		result.h[key1] = v;
	}
	var h = attributeAddition.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var key = _g_keys[_g_current++];
		var _g1_key = key;
		var _g1_value = _g_h[key];
		var key1 = _g1_key;
		var value = _g1_value;
		if(Object.prototype.hasOwnProperty.call(attributes.h,key1) == false) {
			result.h[key1] = value;
		}
	}
};
var EventTypes = $hxEnums["EventTypes"] = { __ename__:true,__constructs__:null
	,GameStart: {_hx_name:"GameStart",_hx_index:0,__enum__:"EventTypes",toString:$estr}
	,ActorDead: {_hx_name:"ActorDead",_hx_index:1,__enum__:"EventTypes",toString:$estr}
	,EquipDrop: {_hx_name:"EquipDrop",_hx_index:2,__enum__:"EventTypes",toString:$estr}
	,EquipFullFail: {_hx_name:"EquipFullFail",_hx_index:3,__enum__:"EventTypes",toString:$estr}
	,EquipFullJustNow: {_hx_name:"EquipFullJustNow",_hx_index:4,__enum__:"EventTypes",toString:$estr}
	,ActorAppear: {_hx_name:"ActorAppear",_hx_index:5,__enum__:"EventTypes",toString:$estr}
	,ActorAttack: {_hx_name:"ActorAttack",_hx_index:6,__enum__:"EventTypes",toString:$estr}
	,ActorLevelUp: {_hx_name:"ActorLevelUp",_hx_index:7,__enum__:"EventTypes",toString:$estr}
	,AreaUnlock: {_hx_name:"AreaUnlock",_hx_index:8,__enum__:"EventTypes",toString:$estr}
	,RegionUnlock: {_hx_name:"RegionUnlock",_hx_index:9,__enum__:"EventTypes",toString:$estr}
	,AreaComplete: {_hx_name:"AreaComplete",_hx_index:10,__enum__:"EventTypes",toString:$estr}
	,AreaEnterFirstTime: {_hx_name:"AreaEnterFirstTime",_hx_index:11,__enum__:"EventTypes",toString:$estr}
	,GetXP: {_hx_name:"GetXP",_hx_index:12,__enum__:"EventTypes",toString:$estr}
	,PermanentStatUpgrade: {_hx_name:"PermanentStatUpgrade",_hx_index:13,__enum__:"EventTypes",toString:$estr}
	,statUpgrade: {_hx_name:"statUpgrade",_hx_index:14,__enum__:"EventTypes",toString:$estr}
	,SkillUse: {_hx_name:"SkillUse",_hx_index:15,__enum__:"EventTypes",toString:$estr}
	,MPRunOut: {_hx_name:"MPRunOut",_hx_index:16,__enum__:"EventTypes",toString:$estr}
	,BuffRemoval: {_hx_name:"BuffRemoval",_hx_index:17,__enum__:"EventTypes",toString:$estr}
	,DebuffBlock: {_hx_name:"DebuffBlock",_hx_index:18,__enum__:"EventTypes",toString:$estr}
	,EquipMaxed: {_hx_name:"EquipMaxed",_hx_index:19,__enum__:"EventTypes",toString:$estr}
};
EventTypes.__constructs__ = [EventTypes.GameStart,EventTypes.ActorDead,EventTypes.EquipDrop,EventTypes.EquipFullFail,EventTypes.EquipFullJustNow,EventTypes.ActorAppear,EventTypes.ActorAttack,EventTypes.ActorLevelUp,EventTypes.AreaUnlock,EventTypes.RegionUnlock,EventTypes.AreaComplete,EventTypes.AreaEnterFirstTime,EventTypes.GetXP,EventTypes.PermanentStatUpgrade,EventTypes.statUpgrade,EventTypes.SkillUse,EventTypes.MPRunOut,EventTypes.BuffRemoval,EventTypes.DebuffBlock,EventTypes.EquipMaxed];
var ActorReference = function(type,pos) {
	this.type = type;
	this.pos = pos;
};
ActorReference.__name__ = "ActorReference";
ActorReference.prototype = {
	__class__: ActorReference
};
var GameEvent = function(eType) {
	this.dataString = null;
	this.type = eType;
};
GameEvent.__name__ = "GameEvent";
GameEvent.prototype = {
	__class__: GameEvent
};
var Target = $hxEnums["Target"] = { __ename__:true,__constructs__:null
	,SELF: {_hx_name:"SELF",_hx_index:0,__enum__:"Target",toString:$estr}
	,ENEMY: {_hx_name:"ENEMY",_hx_index:1,__enum__:"Target",toString:$estr}
	,ALL: {_hx_name:"ALL",_hx_index:2,__enum__:"Target",toString:$estr}
};
Target.__constructs__ = [Target.SELF,Target.ENEMY,Target.ALL];
var Rect = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
Rect.__name__ = "Rect";
Rect.fromTwoPoints = function(pointA,pointB) {
	return new Rect(Math.min(pointA.x,pointB.x),Math.min(pointA.y,pointB.y),Math.abs(pointB.x - pointA.x),Math.abs(pointB.y - pointA.y));
};
Rect.fromRectShape = function(r) {
	return new Rect(r.x,r.y,r.width,r.height);
};
Rect.openRangeContains = function(aStart,aWidth,x) {
	if(x > aStart) {
		return x < aStart + aWidth;
	} else {
		return false;
	}
};
Rect.closedRangeContains = function(aStart,aWidth,x) {
	if(x >= aStart) {
		return x <= aStart + aWidth;
	} else {
		return false;
	}
};
Rect.openRangesIntersect = function(aStart,aWidth,bStart,bWidth) {
	return !(aStart >= bStart + bWidth || bStart >= aStart + aWidth);
};
Rect.prototype = {
	equals: function(r) {
		if(r != null && this.x == r.x && this.y == r.y && this.width == r.width) {
			return this.height == r.height;
		} else {
			return false;
		}
	}
	,clone: function() {
		return new Rect(this.x,this.y,this.width,this.height);
	}
	,copyTo: function(r) {
		r.x = this.x;
		r.y = this.y;
		r.width = this.width;
		r.height = this.height;
	}
	,overlaps: function(r) {
		var aStart = this.x;
		var bStart = r.x;
		if(!(aStart >= bStart + r.width || bStart >= aStart + this.width)) {
			var aStart = this.y;
			var bStart = r.y;
			return !(aStart >= bStart + r.height || bStart >= aStart + this.height);
		} else {
			return false;
		}
	}
	,intersect: function(r) {
		var _this = new Rect(this.x,this.y,this.width,this.height);
		if(_this.x < r.x) {
			_this.width -= r.x - _this.x;
			_this.x = r.x;
		}
		if(_this.y < r.y) {
			_this.height -= r.y - _this.y;
			_this.y = r.y;
		}
		if(_this.x + _this.width > r.x + r.width) {
			_this.width -= _this.x + _this.width - (r.x + r.width);
		}
		if(_this.y + _this.height > r.y + r.height) {
			_this.height -= _this.y + _this.height - (r.y + r.height);
		}
		return _this;
	}
	,intersectWith: function(r) {
		if(this.x < r.x) {
			this.width -= r.x - this.x;
			this.x = r.x;
		}
		if(this.y < r.y) {
			this.height -= r.y - this.y;
			this.y = r.y;
		}
		if(this.x + this.width > r.x + r.width) {
			this.width -= this.x + this.width - (r.x + r.width);
		}
		if(this.y + this.height > r.y + r.height) {
			this.height -= this.y + this.height - (r.y + r.height);
		}
		return this;
	}
	,containsPoint: function(p) {
		var aStart = this.x;
		var x = p.x;
		if(x >= aStart && x <= aStart + this.width) {
			var aStart = this.y;
			var x = p.y;
			if(x >= aStart) {
				return x <= aStart + this.height;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	,distanceToPoint: function(p) {
		var dx = Math.max(Math.abs(p.x - (this.x + 0.5 * this.width)) - 0.5 * this.width,0);
		var dy = Math.max(Math.abs(p.y - (this.y + 0.5 * this.height)) - 0.5 * this.height,0);
		return Math.sqrt(dx * dx + dy * dy);
	}
	,distanceToRect: function(r) {
		var dx = Math.max(Math.abs(r.x + 0.5 * r.width - (this.x + 0.5 * this.width)) - 0.5 * (this.width + r.width),0);
		var dy = Math.max(Math.abs(r.y + 0.5 * r.height - (this.y + 0.5 * this.height)) - 0.5 * (this.height + r.height),0);
		return Math.sqrt(dx * dx + dy * dy);
	}
	,addWith: function(v) {
		if(v.x < 0.0) {
			this.x += v.x;
			this.width -= v.x;
		} else {
			this.width += v.x;
		}
		if(v.y < 0.0) {
			this.y += v.y;
			this.height -= v.y;
		} else {
			this.height += v.y;
		}
		return this;
	}
	,getVertex: function(index) {
		var this1 = new Vector2Default(this.x,this.y);
		var v = this1;
		switch(index) {
		case 0:
			break;
		case 1:
			v.x += this.width;
			break;
		case 2:
			v.x += this.width;
			v.y += this.height;
			break;
		case 3:
			v.y += this.height;
			break;
		default:
			throw haxe_Exception.thrown("Invalid vertex index.");
		}
		return v;
	}
	,get_center: function() {
		var this1 = new Vector2Default(this.x + 0.5 * this.width,this.y + 0.5 * this.height);
		return this1;
	}
	,get_topX: function() {
		return this.x + this.width;
	}
	,get_topY: function() {
		return this.y + this.height;
	}
	,set_topX: function(topX) {
		this.width = topX - this.x;
		return this.x + this.width;
	}
	,set_topY: function(topY) {
		this.height = topY - this.y;
		return this.height + this.y;
	}
	,get_area: function() {
		return this.width * this.height;
	}
	,get_isEmpty: function() {
		if(!(this.width <= 0.0)) {
			return this.height <= 0.0;
		} else {
			return true;
		}
	}
	,__class__: Rect
};
var Reflect = function() { };
Reflect.__name__ = "Reflect";
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
var RenderTest = function() { };
RenderTest.__name__ = "RenderTest";
RenderTest.createTestElement1 = function(uiManager) {
	var button = new UIElement();
	button.id = "test";
	button.data.stringData = "test";
	button.style.ninePatch = new NinePatch(4,"button9a",32);
	var self = button.transform.size;
	self.x = 145;
	self.y = 45;
	var mask = new UIElement();
	mask.style.fill = true;
	mask.style.color = 0;
	var self = mask.transform.size;
	self.x = 300;
	self.y = 50;
	var self = mask.transform.position;
	self.x = 0;
	self.y = 20;
	button.mask = mask.transform;
	return button;
};
var Renderer = function() { };
Renderer.__name__ = "Renderer";
Renderer.fillRect = function(transform,color,mask) {
	Renderer.fillRectSimple(color,transform.get_x(),transform.get_y(),transform.size.x,transform.size.y,mask);
};
Renderer.drawRect = function(transform,color,size,mask) {
	transform.feedRect(Renderer.aux);
	var x = Renderer.aux.x;
	var y = Renderer.aux.y;
	var w = Renderer.aux.width;
	var h = Renderer.aux.height;
	Renderer.fillRectSimple(color,x,y,1,h,mask);
	Renderer.fillRectSimple(color,x + w - 1,y,1,h,mask);
	Renderer.fillRectSimple(color,x,y,w,1,mask);
	Renderer.fillRectSimple(color,x,y + h - 1,w,1,mask);
};
Renderer.fillRectSimple = function(color,x,y,w,h,mask) {
	if(mask != null) {
		Renderer.aux.x = x;
		Renderer.aux.y = y;
		Renderer.aux.width = w;
		Renderer.aux.height = h;
		mask.feedRect(Renderer.aux2);
		var _this = Renderer.aux;
		var r = Renderer.aux2;
		if(_this.x < r.x) {
			_this.width -= r.x - _this.x;
			_this.x = r.x;
		}
		if(_this.y < r.y) {
			_this.height -= r.y - _this.y;
			_this.y = r.y;
		}
		if(_this.x + _this.width > r.x + r.width) {
			_this.width -= _this.x + _this.width - (r.x + r.width);
		}
		if(_this.y + _this.height > r.y + r.height) {
			_this.height -= _this.y + _this.height - (r.y + r.height);
		}
		if(Renderer.aux.width <= 0) {
			return;
		}
		if(Renderer.aux.height <= 0) {
			return;
		}
		x = Renderer.aux.x;
		y = Renderer.aux.y;
		w = Renderer.aux.width;
		h = Renderer.aux.height;
	}
	Renderer.drawScaledSubImage("whitep",null,0,0,1,1,x,y,w,h,color);
};
Renderer.NinePatchS = function(ninePatch,x,y,w,h,style,mask) {
	var leftX = x;
	var minY = y;
	var rightX = x + w;
	var maxY = y + h;
};
Renderer.sprite = function(sprite,transform,style,mask) {
	transform.feedRect(Renderer.aux);
	Renderer.drawScaledSubImage(sprite.spriteName,mask,0,0,sprite.rect.width,sprite.rect.height,Renderer.aux.x,Renderer.aux.y,Renderer.aux.width,Renderer.aux.height,style.color,style.alpha);
};
Renderer.NinePatch = function(ninePatch,transform,style,mask) {
	var border = style.ninePatch.borderSize;
	var leftX = transform.position.x;
	var minY = transform.position.y;
	var rightX = leftX + transform.size.x;
	var maxY = minY + transform.size.y;
	var w = transform.size.x;
	var h = transform.size.y;
	var imageName = ninePatch.spriteName;
	var image = ninePatch.rect;
	var color = style.color;
	Renderer.drawScaledSubImage(imageName,mask,border,0,image.width - border * 2,border,leftX,minY,w,border,color);
	Renderer.drawScaledSubImage(imageName,mask,border,image.height - border,image.width - border * 2,border,leftX,maxY - border,w,border,color);
	Renderer.drawScaledSubImage(imageName,mask,image.width - border,border,border,image.height - border * 2,rightX - border,minY + border,border,h - border * 2,color);
	Renderer.drawScaledSubImage(imageName,mask,0,border,border,image.height - border * 2,leftX,minY + border,border,h - border * 2,color);
	Renderer.drawSubImage(imageName,mask,leftX,minY,0,0,border,border,color);
	Renderer.drawSubImage(imageName,mask,rightX - border,minY,image.width - border,0,border,border,color);
	Renderer.drawSubImage(imageName,mask,leftX,maxY - border,0,image.height - border,border,border,color);
	Renderer.drawSubImage(imageName,mask,rightX - border,maxY - border,image.width - border,image.height - border,border,border,color);
};
Renderer.drawScaledSubImage = function(imageName,mask,sx,sy,sw,sh,dx,dy,dw,dh,color,alpha) {
	if(alpha == null) {
		alpha = 255;
	}
	if(color == null) {
		color = 16777215;
	}
	var tmp = color != 0;
	if(mask != null) {
		mask.feedRect(Renderer.aux2);
		Renderer.aux.x = sx;
		Renderer.aux.y = sy;
		Renderer.aux.width = sw;
		Renderer.aux.height = sh;
		Renderer.aux3.x = dx;
		Renderer.aux3.y = dy;
		Renderer.aux3.width = dw;
		Renderer.aux3.height = dh;
		var _this = Renderer.aux3;
		var r = Renderer.aux2;
		if(_this.x < r.x) {
			_this.width -= r.x - _this.x;
			_this.x = r.x;
		}
		if(_this.y < r.y) {
			_this.height -= r.y - _this.y;
			_this.y = r.y;
		}
		if(_this.x + _this.width > r.x + r.width) {
			_this.width -= _this.x + _this.width - (r.x + r.width);
		}
		if(_this.y + _this.height > r.y + r.height) {
			_this.height -= _this.y + _this.height - (r.y + r.height);
		}
		if(Renderer.aux3.width <= 0 || Renderer.aux3.height <= 0) {
			return;
		}
		if(Renderer.aux3.width != dw || Renderer.aux3.height != dh) {
			mask.feedRect(Renderer.aux4);
			Renderer.aux4.x -= dx - sx;
			Renderer.aux4.y -= dy - sy;
			var _this = Renderer.aux;
			var r = Renderer.aux4;
			if(_this.x < r.x) {
				_this.width -= r.x - _this.x;
				_this.x = r.x;
			}
			if(_this.y < r.y) {
				_this.height -= r.y - _this.y;
				_this.y = r.y;
			}
			if(_this.x + _this.width > r.x + r.width) {
				_this.width -= _this.x + _this.width - (r.x + r.width);
			}
			if(_this.y + _this.height > r.y + r.height) {
				_this.height -= _this.y + _this.height - (r.y + r.height);
			}
			sx = Renderer.aux.x;
			sy = Renderer.aux.y;
			sw = Renderer.aux.width;
			sh = Renderer.aux.height;
			dx = Renderer.aux3.x;
			dy = Renderer.aux3.y;
			dw = Renderer.aux3.width;
			dh = Renderer.aux3.height;
		}
	}
	dx = dx | 0;
	dy = dy | 0;
	PhaserRenderer.drawImage(imageName,sx,sy,sw,sh,dx,dy,dw,dh,alpha / 255,color);
};
Renderer.drawSubImage = function(img,mask,x,y,sx,sy,sw,sh,color) {
	if(color == null) {
		color = 16777215;
	}
	Renderer.drawScaledSubImage(img,mask,sx,sy,sw,sh,x,y,sw,sh);
};
var SaveAssistant = function() { };
SaveAssistant.__name__ = "SaveAssistant";
SaveAssistant.GetPersistenceMaster = function(jsonData) {
	if(jsonData != null && jsonData != "" && jsonData != "undefined") {
		var parsed = JSON.parse(jsonData);
		var persistenceMaster = parsed;
		if(persistenceMaster.worldVersion >= 602 == false) {
			persistenceMaster.jsonGameplay = jsonData;
		}
		return persistenceMaster;
	} else {
		return { worldVersion : -1, jsonStory : null, jsonGameplay : null};
	}
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = "StringTools";
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var Type = function() { };
Type.__name__ = "Type";
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
var UICreation = function(manager) {
	this.activeLayer = 1;
	this.defaultLayer = 1;
	this.tags = [];
	this.manager = manager;
};
UICreation.__name__ = "UICreation";
UICreation.createEmptyElement = function(w,h) {
	var e = new UIElement();
	var self = e.transform.size;
	self.x = w;
	self.y = h;
	return e;
};
UICreation.prototype = {
	addWithOffset: function(element,parent,pivotX,pivotY,posX,posY) {
		this.addElement(element);
		this.offsetElement(element,parent,pivotX,pivotY,posX,posY);
	}
	,addBackground: function(element,layoutId,margin,fitChildren) {
		if(fitChildren == null) {
			fitChildren = true;
		}
		var l = this.manager.genUI.getLayout(layoutId);
		l.bgElement = element;
		l.bgFitChildren = fitChildren;
		l.margin = margin;
		this.addElement(element);
		this.manager.genUI.update(l);
	}
	,offsetElement: function(element,parent,pivotX,pivotY,posX,posY,transferColor,transferState) {
		if(transferState == null) {
			transferState = false;
		}
		if(transferColor == null) {
			transferColor = false;
		}
		var this1 = new Vector2Default(posX,posY);
		var this11 = new Vector2Default(pivotX,pivotY);
		var this12 = new Vector2Default(pivotX,pivotY);
		var off = new UIOffset(element,parent,this1,this11,this12);
		off.transferColor = transferColor;
		off.transferState = transferState;
		this.manager.offsets.push(off);
	}
	,addElementInLayoutId: function(element,layoutId,fitLayoutWidth) {
		if(fitLayoutWidth == null) {
			fitLayoutWidth = false;
		}
		this.addElement(element);
		this.manager.genUI.addElementToLayout(element,layoutId);
		if(fitLayoutWidth) {
			this.manager.genUI.fitWidthOfLayout(element,layoutId);
		}
	}
	,addScrollToLayout: function(layoutId) {
		var scroll = this.manager.genUI.addScrollToLayout(layoutId);
		this.manager.registerScroll(scroll,this.activeLayer);
		return scroll;
	}
	,createImageElement: function(sprite,w,h) {
		var element = new UIElement();
		element.style.sprite = sprite;
		var self = element.transform.size;
		self.x = w;
		self.y = h;
		return element;
	}
	,createBorder: function(w,h,color) {
		if(color == null) {
			color = 0;
		}
		var element = new UIElement();
		var self = element.transform.size;
		self.x = w;
		self.y = h;
		element.style.border = 1;
		element.style.borderColor = color;
		return element;
	}
	,singleTag: function(tag) {
		this.tags.length = 0;
		this.tags.push(tag);
	}
	,addElement: function(element) {
		this.manager.addElement(element,this.activeLayer);
		var _g = 0;
		var _g1 = this.tags;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			element.tags.push(s);
		}
	}
	,addFullScreenRect: function(color,tag) {
		var element = new UIElement();
		var self = element.transform.size;
		self.x = Renderer.width;
		self.y = Renderer.height;
		var self = element.transform.position;
		self.x = 0;
		self.y = 0;
		element.tags.push(tag);
		element.style.color = color;
		element.style.fill = true;
		this.addElement(element);
		return element;
	}
	,__class__: UICreation
};
var UIElementManager = function(nLayers) {
	this.visibilityHogTags = [];
	this.inputHogTags = [];
	this.hover = new HoverManager();
	this.invisibleTags = [];
	this.dataEvents = [];
	this.scrolls = [];
	this.offsets = [];
	this.elementsHolder = [];
	var _g = 0;
	var _g1 = nLayers;
	while(_g < _g1) {
		var i = _g++;
		this.elementsHolder.push([]);
	}
};
UIElementManager.__name__ = "UIElementManager";
UIElementManager.prototype = {
	Update: function(time,mouse) {
		this.dataEvents.length = 0;
		var _g_current = 0;
		var _g_array = this.offsets;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			var originPos = value.origin.transform.position;
			var b = value.offset;
			var self = originPos;
			var this1 = new Vector2Default(self.x,self.y);
			var self1 = this1;
			self1.x += b.x;
			self1.y += b.y;
			value.target.transform.position = self1;
			if(value.pivotD != null && value.pivotS != null) {
				value.target.transform.position.x += Pivot.calculateDimension(value.pivotS.x,value.pivotD.x,value.target.transform.size.x,value.origin.transform.size.x);
				value.target.transform.position.y += Pivot.calculateDimension(value.pivotS.y,value.pivotD.y,value.target.transform.size.y,value.origin.transform.size.y);
			}
			if(value.transferColor) {
				value.target.style.color = value.origin.style.color;
				if(value.target.styleHover != null && value.origin.styleHover != null) {
					value.target.styleHover.color = value.origin.styleHover.color;
				}
				if(value.target.styleSelected != null && value.origin.styleSelected != null) {
					value.target.styleSelected.color = value.origin.styleSelected.color;
				}
			}
			if(value.transferState) {
				value.target.selected = value.origin.selected;
				value.target.enabled = value.origin.enabled;
				value.target.hovered.state = value.origin.hovered.state;
			}
		}
		var _g = 0;
		var _g1 = this.elementsHolder;
		while(_g < _g1.length) {
			var elements = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < elements.length) {
				var e = elements[_g2];
				++_g2;
				if(this.containTagInGroup(e,this.invisibleTags)) {
					continue;
				}
				if(e.managedState) {
					e.clickedThisFrame = false;
					e.hovered.startFrame();
					e.touch.startFrame();
					if(this.inputHog) {
						if(this.containTagInGroup(e,this.inputHogTags) == false) {
							continue;
						}
					}
					var mouseInside = this.pointInTransform(e.transform,mouse.mousePosition);
					if(e.mask != null && mouseInside) {
						mouseInside = mouseInside && this.pointInTransform(e.mask,mouse.mousePosition);
					}
					e.hovered.state = mouseInside;
					if(e.hovered.trueThisFrame()) {
						this.hover.hoverElement(e,this);
					}
					if(mouseInside) {
						if(e.enabled) {
							if(e.touch.state == true) {
								if(mouse.mousePressed.falseThisFrame()) {
									e.clickedThisFrame = true;
									e.touch.state = false;
								}
							}
							if(mouse.mousePressed.trueThisFrame()) {
								e.touch.state = true;
							}
						}
					}
					if(mouse.mousePressed.state == false) {
						e.touch.state = false;
					}
					if(e.clickedThisFrame) {
						if(e.data != null) {
							this.dataEvents.push(e.data);
						}
					}
				}
			}
		}
		this.hover.checkHoverElementEnd(this);
		var _g = 0;
		var _g1 = this.scrolls;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			UIScrollLogic.update(s,mouse.mouseMoved);
		}
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.elementsHolder;
		while(_g < _g1.length) {
			var elements = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < elements.length) {
				var element = elements[_g2];
				++_g2;
				if(this.visibilityHog) {
					if(this.containTagInGroup(element,this.visibilityHogTags) == false) {
						continue;
					}
				}
				if(element.visible) {
					if(this.containTagInGroup(element,this.invisibleTags)) {
						continue;
					}
					var style = element.style;
					if(element.enabled || element.styleDisabled == null) {
						if(element.selected && element.styleSelected != null) {
							style = element.styleSelected;
						} else if(element.hovered.state && element.styleHover != null) {
							style = element.styleHover;
						}
					} else {
						style = element.styleDisabled;
					}
					this.renderStyle(style,element.transform,element.mask);
					if(element.text != null) {
						var pivotX = element.textPivot.x;
						var pivotY = element.textPivot.y;
						var bottomX = element.transform.position.x;
						var bottomY = element.transform.position.y;
						var x = bottomX + element.transform.size.x * pivotX;
						var y = bottomY + element.transform.size.y * pivotY;
						XTextRender.drawTextMultiLine(element.text,element.textFont,x,y,pivotX,pivotY,style.color,element.mask);
					}
				}
			}
		}
	}
	,feedElement: function(element,feed) {
		element.data.intData = feed.data.intData;
		element.data.stringData = feed.data.stringData;
		element.enabled = feed.enabled;
		element.text = feed.text;
		element.visible = feed.visible;
		if(feed.infoText != null && feed.infoText != "") {
			this.hover.setHoverGeneric(element,element.text,feed.infoText);
		}
	}
	,updateBarLeftText: function(bar,text) {
		bar.leftText.text = text;
	}
	,updateBarValue: function(bar,value,maxValue) {
		bar.barPortion.transform.size.x = value * bar.barMaxSize / maxValue;
		bar.mainText.text = value + "";
	}
	,endInputHog: function() {
		this.inputHog = false;
	}
	,hogInput: function(tag) {
		this.inputHogTags.length = 0;
		this.inputHog = true;
		this.inputHogTags.push(tag);
	}
	,endVisibilityHog: function() {
		this.visibilityHog = false;
	}
	,hogVisibility: function(tag) {
		this.visibilityHogTags.length = 0;
		this.visibilityHog = true;
		this.visibilityHogTags.push(tag);
	}
	,containTagInGroup: function(element,tags) {
		var _g_current = 0;
		var _g_array = element.tags;
		while(_g_current < _g_array.length) {
			var _g1_value = _g_array[_g_current];
			var _g1_key = _g_current++;
			var index = _g1_key;
			var value = _g1_value;
			if(tags.indexOf(value) != -1) {
				return true;
			}
		}
		return false;
	}
	,addElement: function(element,layer) {
		this.elementsHolder[layer].push(element);
	}
	,registerScroll: function(scroll,layer) {
		this.scrolls.push(scroll);
		this.addElement(scroll.viewport,layer);
	}
	,pointInTransform: function(ele,point) {
		var min = ele.position;
		var b = ele.position;
		var self = ele.size;
		var max_x = self.x;
		var max_y = self.y;
		max_x += b.x;
		max_y += b.y;
		if(point.x >= min.x && point.x <= max_x) {
			if(point.y >= min.y && point.y <= max_y) {
				return true;
			}
		}
		return false;
	}
	,fitTextHeight: function(element) {
		var height = XTextRender.textHeight(element.text,element.textFont);
		element.transform.size.y = height;
	}
	,extendElementHeight: function(element,offsetBottom) {
		var _this = element.transform;
		_this.size.y = Renderer.height - offsetBottom - _this.position.y;
	}
	,renderStyle: function(style,transform,mask) {
		if(style.fill) {
			Renderer.fillRect(transform,style.color,mask);
		}
		if(style.ninePatch != null) {
			Renderer.NinePatch(style.ninePatch,transform,style,mask);
		}
		if(style.sprite != null) {
			Renderer.sprite(style.sprite,transform,style,mask);
		}
		if(style.border > 0) {
			Renderer.drawRect(transform,style.borderColor,style.border,mask);
		}
	}
	,elementVisibility: function(elementId,visible) {
		this.getElement(elementId).visible = visible;
	}
	,tagVisibility: function(tag,visible) {
		while(HxOverrides.remove(this.invisibleTags,tag)) {
		}
		if(visible == false) {
			this.invisibleTags.push(tag);
		}
	}
	,elementEnabled: function(elementId,enabled) {
		this.getElement(elementId).enabled = enabled;
	}
	,getElement: function(elementId) {
		var _g = 0;
		var _g1 = this.elementsHolder;
		while(_g < _g1.length) {
			var elements = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < elements.length) {
				var element = elements[_g2];
				++_g2;
				if(element.id == elementId) {
					return element;
				}
			}
		}
		return null;
	}
	,elementTextId: function(elementId,text,fitTextHeight) {
		if(fitTextHeight == null) {
			fitTextHeight = false;
		}
		var e = this.getElement(elementId);
		this.elementText(e,text,fitTextHeight);
	}
	,elementText: function(e,text,fitTextHeight) {
		if(fitTextHeight == null) {
			fitTextHeight = false;
		}
		e.text = text;
		if(fitTextHeight) {
			e.transform.size.y = XTextRender.textHeight(text,e.textFont);
		}
	}
	,__class__: UIElementManager
};
var Data = function() {
};
Data.__name__ = "Data";
Data.prototype = {
	__class__: Data
};
var UIElement = function() {
	this.managedState = true;
	this.selected = false;
	this.visible = true;
	this.enabled = true;
	this.data = new Data();
	this.styleDisabled = null;
	this.styleSelected = null;
	this.styleHover = null;
	this.style = new Style();
	this.touch = new BoolProperty();
	this.clickedThisFrame = false;
	this.hovered = new BoolProperty();
	this.mask = null;
	this.textPivot = new Vector2Default(0.5,0.5);
	this.textFont = "main";
	this.text = null;
	this.transform = new XTransform();
	this.tags = [];
};
UIElement.__name__ = "UIElement";
UIElement.prototype = {
	__class__: UIElement
};
var UIElementFeed = function() {
	this.data = new Data();
	this.infoText = null;
	this.text = null;
	this.visible = true;
	this.enabled = true;
};
UIElementFeed.__name__ = "UIElementFeed";
UIElementFeed.prototype = {
	__class__: UIElementFeed
};
var UIFeedList = function() {
	this.header = null;
	this.feedList = [];
};
UIFeedList.__name__ = "UIFeedList";
UIFeedList.prototype = {
	invisibleAfterCap: function(vLength) {
		var _g = vLength;
		var _g1 = this.feedList.length;
		while(_g < _g1) {
			var i = _g++;
			this.feedList[i].visible = false;
		}
	}
	,element: function(index) {
		while(this.feedList.length <= index) {
			var uef = new UIElementFeed();
			this.feedList.push(uef);
		}
		return this.feedList[index];
	}
	,__class__: UIFeedList
};
var UIFeedLists = function() {
	this.feedLists = [];
};
UIFeedLists.__name__ = "UIFeedLists";
UIFeedLists.prototype = {
	initList: function(listHeader) {
		var ufl = new UIFeedList();
		ufl.header = listHeader;
		this.feedLists.push(ufl);
	}
	,set: function(list,element,text,infoText,enabled) {
		if(enabled == null) {
			enabled = true;
		}
		var feed = this.feedLists[list].element(element);
		feed.text = text;
		feed.enabled = enabled;
		feed.infoText = infoText;
		feed.visible = true;
	}
	,setData: function(list,element,data,dataN) {
		var feed = this.feedLists[list].element(element);
		feed.data.stringData = data;
		feed.data.intData = dataN;
	}
	,__class__: UIFeedLists
};
var UIOffset = function(target,origin,offset,pivotS,pivotD) {
	this.transferState = false;
	this.transferColor = false;
	this.origin = origin;
	this.target = target;
	this.offset = offset;
	this.pivotS = pivotS;
	this.pivotD = pivotD;
};
UIOffset.__name__ = "UIOffset";
UIOffset.prototype = {
	__class__: UIOffset
};
var Style = function() {
	this.alpha = 255;
	this.borderColor = 0;
	this.border = 0;
	this.ninePatch = null;
	this.color = 16777215;
};
Style.__name__ = "Style";
Style.prototype = {
	setFill: function(color) {
		this.color = color;
		this.fill = true;
	}
	,__class__: Style
};
var NinePatch = function(borderSize,spriteN,imageSize) {
	this.rect = new Rect(0,0,0,0);
	this.borderSize = 0;
	this.borderSize = borderSize;
	this.spriteName = spriteN;
	this.rect.width = imageSize;
	this.rect.height = imageSize;
};
NinePatch.__name__ = "NinePatch";
NinePatch.prototype = {
	__class__: NinePatch
};
var XTransform = function() {
	this.pivot = new Vector2Default(0,0);
	this.scale = new Vector2Default(1,1);
	this.size = new Vector2Default(0,0);
	this.rotation = 0;
	this.position = new Vector2Default(0,0);
};
XTransform.__name__ = "XTransform";
XTransform.prototype = {
	get_x: function() {
		return this.position.x;
	}
	,set_x: function(x) {
		this.position.x = x;
		return x;
	}
	,get_y: function() {
		return this.position.y;
	}
	,set_y: function(y) {
		this.position.y = y;
		return y;
	}
	,get_centerX: function() {
		return this.position.x + this.size.x / 2;
	}
	,get_centerY: function() {
		return this.position.y + this.size.y / 2;
	}
	,set: function(x,y,w,h) {
		this.position.x = x;
		this.position.y = y;
		this.size.x = w;
		this.size.y = h;
	}
	,feedRect: function(rect) {
		if(rect == null) {
			rect = new Rect(0,0,0,0);
		}
		rect.x = this.position.x;
		rect.y = this.position.y;
		rect.width = this.size.x;
		rect.height = this.size.y;
		return rect;
	}
	,set_topX: function(topX) {
		this.size.x = topX - this.position.x;
		return this.size.x + this.position.x;
	}
	,get_topX: function() {
		return this.position.x + this.size.x;
	}
	,get_topY: function() {
		return this.position.y + this.size.y;
	}
	,set_topY: function(topY) {
		this.size.y = topY - this.position.y;
		return this.size.y + this.position.y;
	}
	,set_bottomX: function(x) {
		this.position.x = x;
		return x;
	}
	,get_bottomX: function() {
		return this.position.x;
	}
	,get_bottomY: function() {
		return this.position.y;
	}
	,set_bottomY: function(y) {
		this.position.y = y;
		return y;
	}
	,__class__: XTransform
};
var BoolProperty = function() {
	this.previousState = false;
	this.state = false;
};
BoolProperty.__name__ = "BoolProperty";
BoolProperty.prototype = {
	updated: function() {
		return this.state != this.previousState;
	}
	,trueThisFrame: function() {
		if(this.updated()) {
			return this.state == true;
		} else {
			return false;
		}
	}
	,falseThisFrame: function() {
		if(this.updated()) {
			return this.state == false;
		} else {
			return false;
		}
	}
	,startFrame: function() {
		this.previousState = this.state;
	}
	,__class__: BoolProperty
};
var GenMasterAccess = function(gen) {
	this.genMaster = gen;
};
GenMasterAccess.__name__ = "GenMasterAccess";
GenMasterAccess.prototype = {
	getLinearLayout: function(id) {
		var _g = 0;
		var _g1 = this.genMaster.linearLayouts;
		while(_g < _g1.length) {
			var unknown = _g1[_g];
			++_g;
			if(unknown.element.id == id) {
				return unknown;
			}
		}
		window.alert(Std.string("Layout not found " + id));
		return null;
	}
	,__class__: GenMasterAccess
};
var HoverInformation = function() {
	this.enabled = true;
};
HoverInformation.__name__ = "HoverInformation";
HoverInformation.prototype = {
	__class__: HoverInformation
};
var HoverView = function(header,mainText,layoutId,tag) {
	this.header = header;
	this.mainText = mainText;
	this.layoutId = layoutId;
	this.tag = tag;
};
HoverView.__name__ = "HoverView";
HoverView.prototype = {
	__class__: HoverView
};
var HoverManager = function() {
	this.hovers = new haxe_ds_ObjectMap();
};
HoverManager.__name__ = "HoverManager";
HoverManager.prototype = {
	setHoverGeneric: function(element,header,mainText) {
		var hover = this.hovers.h[element.__id__];
		if(hover == null) {
			hover = new HoverInformation();
			this.hovers.set(element,hover);
		}
		hover.enabled = true;
		hover.header = header;
		hover.mainText = mainText;
	}
	,removeHover: function(element) {
		var hover = this.hovers.h[element.__id__];
		if(hover != null) {
			hover.enabled = false;
		}
	}
	,hoverElement: function(element,manager) {
		if(this.hoverView != null) {
			var hover = this.hovers.h[element.__id__];
			if(hover != null && hover.enabled) {
				this.hovered = element;
				manager.elementText(this.hoverView.header,hover.header,false);
				manager.elementText(this.hoverView.mainText,hover.mainText,true);
				manager.tagVisibility(this.hoverView.tag,true);
				manager.genUI.layoutAsHover(element,this.hoverView.layoutId);
			}
		}
	}
	,checkHoverElementEnd: function(manager) {
		if(this.hovered != null) {
			if(this.hovered.hovered.state == false) {
				this.hovered = null;
				manager.tagVisibility(this.hoverView.tag,false);
			}
		}
	}
	,__class__: HoverManager
};
var UIScroll = function(elementArray) {
	this.positionElements = true;
	this.margin = null;
	this.offset = new Vector2Default(0,10);
	if(elementArray == null) {
		this.elements = [];
	} else {
		this.elements = elementArray;
	}
};
UIScroll.__name__ = "UIScroll";
UIScroll.prototype = {
	__class__: UIScroll
};
var UIScrollLogic = function() { };
UIScrollLogic.__name__ = "UIScrollLogic";
UIScrollLogic.recalculateContentRect = function(scroll) {
	if(scroll.content == null) {
		scroll.content = new Rect(9999,9999,0,0);
	}
	scroll.content.x = 9999;
	scroll.content.y = 9999;
	scroll.content.width = 0;
	scroll.content.height = 0;
	var rectAux = new Rect(0,0,0,0);
	var _g = 0;
	var _g1 = scroll.elements;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		e.mask = scroll.viewport.transform;
		e.transform.feedRect(rectAux);
		if(scroll.content.x > rectAux.x) {
			scroll.content.x = rectAux.x;
		}
		if(scroll.content.y > rectAux.y) {
			scroll.content.y = rectAux.y;
		}
		var _this = scroll.content;
		if(_this.x + _this.width < rectAux.x + rectAux.width) {
			var _this1 = scroll.content;
			_this1.width = rectAux.x + rectAux.width - _this1.x;
		}
		var _this2 = scroll.content;
		if(_this2.y + _this2.height < rectAux.y + rectAux.height) {
			var _this3 = scroll.content;
			_this3.height = rectAux.y + rectAux.height - _this3.y;
		}
		if(scroll.content.height < rectAux.height) {
			scroll.content.height = rectAux.height;
		}
	}
};
UIScrollLogic.update = function(scroll,deltaMouseMove) {
	var tmp;
	if(scroll.viewport.touch.state) {
		var self = deltaMouseMove;
		tmp = self.x * self.x + self.y * self.y > 0;
	} else {
		tmp = false;
	}
	if(tmp) {
		var self_x = 0;
		var self_y = 0;
		var self = scroll.offset;
		var self1 = self;
		var value = self1.x;
		self_x = value;
		var self1 = self;
		var value = self1.y;
		self_y = value;
		scroll.offset.y += deltaMouseMove.y;
		var subY = 10;
		var addH = 10;
		if(scroll.margin != null) {
			subY = scroll.margin.y;
			addH = scroll.margin.height;
		}
		var _this = scroll.viewport.transform;
		var _this1 = scroll.content;
		var minoffSetY = _this.position.y + _this.size.y - (_this1.y + _this1.height) - subY;
		if(scroll.offset.y < minoffSetY) {
			scroll.offset.y = minoffSetY;
		}
		var maxOffsetY = scroll.viewport.transform.position.y - scroll.content.y + addH;
		if(scroll.offset.y > maxOffsetY) {
			scroll.offset.y = maxOffsetY;
		}
		var deltaY = scroll.offset.y - self_y;
		if(deltaY != 0) {
			if(scroll.positionElements) {
				var _g = 0;
				var _g1 = scroll.elements;
				while(_g < _g1.length) {
					var e = _g1[_g];
					++_g;
					e.transform.position.y += scroll.offset.y - self_y;
				}
			}
		}
	}
};
var UInt = {};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var Vector2Default = function(x,y) {
	this.x = x;
	this.y = y;
};
Vector2Default.__name__ = "Vector2Default";
Vector2Default.prototype = {
	toString: function() {
		return "(" + this.x + ", " + this.y + ")";
	}
	,__class__: Vector2Default
};
var Vector2 = {};
Vector2._new = function(x,y) {
	var this1 = new Vector2Default(x,y);
	return this1;
};
Vector2.fromArray = function(rawData) {
	if(rawData.length != 2) {
		throw haxe_Exception.thrown("Invalid rawData.");
	}
	var this1 = new Vector2Default(rawData[0],rawData[1]);
	return this1;
};
Vector2.fromPolar = function(angle,radius) {
	var this1 = new Vector2Default(radius * Math.cos(angle),radius * Math.sin(angle));
	return this1;
};
Vector2.fromVector2Shape = function(other) {
	var this1 = new Vector2Default(other.x,other.y);
	return this1;
};
Vector2.dot = function(a,b) {
	return a.x * b.x + a.y * b.y;
};
Vector2.multiply = function(a,s) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x *= s;
	self.y *= s;
	return self;
};
Vector2.divide = function(a,s) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x /= s;
	self.y /= s;
	return self;
};
Vector2.add = function(a,b) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x += b.x;
	self.y += b.y;
	return self;
};
Vector2.subtract = function(a,b) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x -= b.x;
	self.y -= b.y;
	return self;
};
Vector2.negate = function(a) {
	var this1 = new Vector2Default(-a.x,-a.y);
	return this1;
};
Vector2.equals = function(a,b) {
	if(!(a == null && b == null)) {
		if(a != null && b != null && a.x == b.x) {
			return a.y == b.y;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Vector2.lerp = function(a,b,t) {
	var this1 = new Vector2Default((1.0 - t) * a.x + t * b.x,(1.0 - t) * a.y + t * b.y);
	return this1;
};
Vector2.max = function(a,b) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x = Math.max(self.x,b.x);
	self.y = Math.max(self.y,b.y);
	return self;
};
Vector2.min = function(a,b) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	self.x = Math.min(self.x,b.x);
	self.y = Math.min(self.y,b.y);
	return self;
};
Vector2.project = function(a,b) {
	var self = a;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	var s = (self.x * b.x + self.y * b.y) / (b.x * b.x + b.y * b.y);
	var self1 = b;
	var self2 = self1;
	var value = self2.x;
	var self2 = self;
	self2.x = value;
	var self2 = self1;
	var value = self2.y;
	var self1 = self;
	self1.y = value;
	var self1 = self;
	self1.x *= s;
	self1.y *= s;
	return self;
};
Vector2.reflect = function(v,normal) {
	var self = v;
	var this1 = new Vector2Default(self.x,self.y);
	var self = this1;
	var self1 = self;
	var self_x = self1.x;
	var self_y = self1.y;
	var s = (self_x * normal.x + self_y * normal.y) / (normal.x * normal.x + normal.y * normal.y);
	var self1 = normal;
	var self2 = self1;
	var value = self2.x;
	self_x = value;
	var self2 = self1;
	var value = self2.y;
	self_y = value;
	self_x *= s;
	self_y *= s;
	self_x *= 2.0;
	self_y *= 2.0;
	var self1 = self;
	self1.x -= self_x;
	self1.y -= self_y;
	return self;
};
Vector2.orthoNormalize = function(u,v) {
	var self = u;
	var self1 = self;
	var length = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	if(length > 0.0) {
		var self1 = self;
		self1.x /= length;
		self1.y /= length;
	}
	var self = v;
	var a_x = self.x;
	var a_y = self.y;
	var s = (a_x * u.x + a_y * u.y) / (u.x * u.x + u.y * u.y);
	var self = u;
	var self1 = self;
	var value = self1.x;
	a_x = value;
	var self1 = self;
	var value = self1.y;
	a_y = value;
	a_x *= s;
	a_y *= s;
	var self = v;
	self.x -= a_x;
	self.y -= a_y;
	var self = v;
	var self1 = self;
	var length = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	if(length > 0.0) {
		var self1 = self;
		self1.x /= length;
		self1.y /= length;
	}
};
Vector2.set = function(this1,x,y) {
	var self = this1;
	self.x = x;
	self.y = y;
	return self;
};
Vector2.multiplyWith = function(this1,s) {
	var self = this1;
	self.x *= s;
	self.y *= s;
	return self;
};
Vector2.divideWith = function(this1,s) {
	var self = this1;
	self.x /= s;
	self.y /= s;
	return self;
};
Vector2.addWith = function(this1,a) {
	var self = this1;
	self.x += a.x;
	self.y += a.y;
	return self;
};
Vector2.subtractWith = function(this1,a) {
	var self = this1;
	self.x -= a.x;
	self.y -= a.y;
	return self;
};
Vector2.maxWith = function(this1,a) {
	var self = this1;
	self.x = Math.max(self.x,a.x);
	self.y = Math.max(self.y,a.y);
	return self;
};
Vector2.minWith = function(this1,a) {
	var self = this1;
	self.x = Math.min(self.x,a.x);
	self.y = Math.min(self.y,a.y);
	return self;
};
Vector2.projectOnto = function(this1,a) {
	var self = this1;
	var s = (self.x * a.x + self.y * a.y) / (a.x * a.x + a.y * a.y);
	var self1 = a;
	var self2 = self1;
	var value = self2.x;
	var self2 = self;
	self2.x = value;
	var self2 = self1;
	var value = self2.y;
	var self1 = self;
	self1.y = value;
	var self1 = self;
	self1.x *= s;
	self1.y *= s;
	return self;
};
Vector2.reflectBy = function(this1,normal) {
	var self = this1;
	var self1 = self;
	var self_x = self1.x;
	var self_y = self1.y;
	var s = (self_x * normal.x + self_y * normal.y) / (normal.x * normal.x + normal.y * normal.y);
	var self1 = normal;
	var self2 = self1;
	var value = self2.x;
	self_x = value;
	var self2 = self1;
	var value = self2.y;
	self_y = value;
	self_x *= s;
	self_y *= s;
	self_x *= 2.0;
	self_y *= 2.0;
	var self1 = self;
	self1.x -= self_x;
	self1.y -= self_y;
	return self;
};
Vector2.copyTo = function(this1,target) {
	var self = this1;
	var self1 = self;
	var value = self1.x;
	var self1 = target;
	self1.x = value;
	var self1 = self;
	var value = self1.y;
	var self = target;
	self.y = value;
};
Vector2.copyToShape = function(this1,target) {
	var self = this1;
	target.x = self.x;
	target.y = self.y;
};
Vector2.copyFromShape = function(this1,source) {
	var self = this1;
	self.x = source.x;
	self.y = source.y;
};
Vector2.clone = function(this1) {
	var self = this1;
	var this1 = new Vector2Default(self.x,self.y);
	return this1;
};
Vector2.getArrayElement = function(this1,i) {
	var self = this1;
	switch(i) {
	case 0:
		return self.x;
	case 1:
		return self.y;
	default:
		throw haxe_Exception.thrown("Invalid element");
	}
};
Vector2.setArrayElement = function(this1,i,value) {
	var self = this1;
	switch(i) {
	case 0:
		return self.x = value;
	case 1:
		return self.y = value;
	default:
		throw haxe_Exception.thrown("Invalid element");
	}
};
Vector2.applyNegate = function(this1) {
	var self = this1;
	self.x = -self.x;
	self.y = -self.y;
	return self;
};
Vector2.applyScalarFunc = function(this1,func) {
	var self = this1;
	var self1 = self;
	var value = func(self1.x);
	var self1 = self;
	self1.x = value;
	var self1 = self;
	var value = func(self1.y);
	var self1 = self;
	self1.y = value;
	return self;
};
Vector2.angleWith = function(this1,b) {
	var self = this1;
	var self1 = self;
	var self2 = b;
	return Math.acos((self.x * b.x + self.y * b.y) / (Math.sqrt(self1.x * self1.x + self1.y * self1.y) * Math.sqrt(self2.x * self2.x + self2.y * self2.y)));
};
Vector2.signedAngleWith = function(this1,b) {
	var self = this1;
	return -1;
};
Vector2.distanceTo = function(this1,b) {
	var self = this1;
	var self1 = self;
	var self_x = self1.x;
	var self_y = self1.y;
	self_x -= b.x;
	self_y -= b.y;
	return Math.sqrt(self_x * self_x + self_y * self_y);
};
Vector2.normalize = function(this1) {
	var self = this1;
	var self1 = self;
	var length = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	if(length > 0.0) {
		var self1 = self;
		self1.x /= length;
		self1.y /= length;
	}
	return self;
};
Vector2.normalizeTo = function(this1,newLength) {
	var self = this1;
	var self1 = self;
	var self2 = self1;
	var length = Math.sqrt(self2.x * self2.x + self2.y * self2.y);
	if(length > 0.0) {
		var self2 = self1;
		self2.x /= length;
		self2.y /= length;
	}
	var self1 = self;
	self1.x *= newLength;
	self1.y *= newLength;
	return self;
};
Vector2.clamp = function(this1,min,max) {
	var self = this1;
	var self1 = self;
	var length = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	if(length < min) {
		var self1 = self;
		var self2 = self1;
		var self3 = self2;
		var length1 = Math.sqrt(self3.x * self3.x + self3.y * self3.y);
		if(length1 > 0.0) {
			var self3 = self2;
			self3.x /= length1;
			self3.y /= length1;
		}
		var self2 = self1;
		self2.x *= min;
		self2.y *= min;
	} else if(length > max) {
		var self1 = self;
		var self2 = self1;
		var self3 = self2;
		var length = Math.sqrt(self3.x * self3.x + self3.y * self3.y);
		if(length > 0.0) {
			var self3 = self2;
			self3.x /= length;
			self3.y /= length;
		}
		var self2 = self1;
		self2.x *= max;
		self2.y *= max;
	}
	return self;
};
Vector2.rotate = function(this1,angle,pivot) {
	var self = this1;
	var cosAngle = Math.cos(angle);
	var sinAngle = Math.sin(angle);
	var dx = self.x;
	var dy = self.y;
	if(pivot != null) {
		dx = self.x - pivot.x;
		dy = self.y - pivot.y;
	}
	self.x = dx * cosAngle - dy * sinAngle;
	self.y = dx * sinAngle + dy * cosAngle;
	return self;
};
Vector2.rotateLeft = function(this1) {
	var self = this1;
	var newX = -self.y;
	self.y = self.x;
	self.x = newX;
	return self;
};
Vector2.rotateRight = function(this1) {
	var self = this1;
	var newX = self.y;
	self.y = -self.x;
	self.x = newX;
	return self;
};
Vector2.get_zero = function() {
	var this1 = new Vector2Default(0.0,0.0);
	return this1;
};
Vector2.get_xAxis = function() {
	var this1 = new Vector2Default(1.0,0.0);
	return this1;
};
Vector2.get_yAxis = function() {
	var this1 = new Vector2Default(0.0,1.0);
	return this1;
};
Vector2.get_length = function(this1) {
	var self = this1;
	return Math.sqrt(self.x * self.x + self.y * self.y);
};
Vector2.get_lengthSq = function(this1) {
	var self = this1;
	return self.x * self.x + self.y * self.y;
};
Vector2.get_angle = function(this1) {
	var self = this1;
	return Math.atan2(self.y,self.x);
};
Vector2.get_normal = function(this1) {
	var self = this1;
	var self1 = self;
	var this1 = new Vector2Default(self1.x,self1.y);
	var self = this1;
	var self1 = self;
	var length = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	if(length > 0.0) {
		var self1 = self;
		self1.x /= length;
		self1.y /= length;
	}
	return self;
};
Vector2.get_rotatedLeft = function(this1) {
	var self = this1;
	var self1 = self;
	var this1 = new Vector2Default(self1.x,self1.y);
	var self = this1;
	var newX = -self.y;
	self.y = self.x;
	self.x = newX;
	return self;
};
Vector2.get_rotatedRight = function(this1) {
	var self = this1;
	var self1 = self;
	var this1 = new Vector2Default(self1.x,self1.y);
	var self = this1;
	var newX = self.y;
	self.y = -self.x;
	self.x = newX;
	return self;
};
Vector2.set_angle = function(this1,angle) {
	var self = this1;
	var self1 = this1;
	var len = Math.sqrt(self1.x * self1.x + self1.y * self1.y);
	var y = len * Math.sin(angle);
	var self1 = self;
	self1.x = len * Math.cos(angle);
	self1.y = y;
	return angle;
};
var XTextRender = function() { };
XTextRender.__name__ = "XTextRender";
XTextRender.textHeight = function(text,font) {
	var font1 = BitmapText.getFont(font);
	var lineNumber = XTextRender.feedLineInformation(text,XTextRender.auxLines);
	return lineNumber * font1.lineHeight;
};
XTextRender.textRectINCOMPLETE = function(rect,text,font) {
	var font1 = BitmapText.getFont(font);
	if(rect == null) {
		rect = XTextRender.aux;
	}
	var cursorX = 0;
	var cursorY = 0;
	var _g = 0;
	var _g1 = text.length;
	while(_g < _g1) {
		var i = _g++;
		var code = HxOverrides.cca(text,i);
		var letter = font1.letters.h[code];
		var x = cursorX + letter.xoffset;
		var y = cursorY + letter.yoffset;
		var w = letter.width;
		var h = letter.height;
	}
};
XTextRender.drawTextMultiLine = function(text,font,x,y,pivotx,pivoty,color,mask) {
	if(color == null) {
		color = -1;
	}
	if(pivoty == null) {
		pivoty = 0;
	}
	if(pivotx == null) {
		pivotx = 0;
	}
	var fontInfo = BitmapText.getFont(font);
	var lineNumber = XTextRender.feedLineInformation(text,XTextRender.auxLines);
	var cursorX = x;
	var cursorY = y - (lineNumber - 1) * fontInfo.lineHeight * pivoty;
	var _g = 0;
	var _g1 = lineNumber;
	while(_g < _g1) {
		var i = _g++;
		var line = XTextRender.auxLines[i];
		XTextRender.drawTextSingleLine(text,font,cursorX,cursorY,pivotx,pivoty,color,mask,line.start,line.end);
		cursorY += fontInfo.lineHeight;
	}
};
XTextRender.drawTextSingleLine = function(text,font,x,y,pivotx,pivoty,color,mask,startIndex,finalIndex) {
	if(finalIndex == null) {
		finalIndex = -1;
	}
	if(startIndex == null) {
		startIndex = 0;
	}
	if(color == null) {
		color = -1;
	}
	if(pivoty == null) {
		pivoty = 0;
	}
	if(pivotx == null) {
		pivotx = 0;
	}
	if(finalIndex < 0) {
		finalIndex = text.length - 1;
	}
	var length = finalIndex + 1;
	var font1 = BitmapText.getFont(font);
	var cursorX = x;
	var cursorY = y;
	if(pivotx != 0 || pivoty != 0) {
		var width = 0;
		var _g = startIndex;
		var _g1 = length;
		while(_g < _g1) {
			var i = _g++;
			var code = HxOverrides.cca(text,i);
			var letter = font1.letters.h[code];
			if(i == text.length - 1) {
				width += letter.width + letter.xoffset;
			} else {
				width += letter.xadvance;
			}
		}
		cursorX = x - width * pivotx | 0;
		cursorY = y - font1.lineHeight * pivoty - 1 | 0;
	}
	var _g = startIndex;
	var _g1 = length;
	while(_g < _g1) {
		var i = _g++;
		var code = HxOverrides.cca(text,i);
		var letter = font1.letters.h[code];
		Renderer.drawScaledSubImage(font1.image,mask,letter.x,letter.y,letter.width,letter.height,cursorX + letter.xoffset,cursorY + letter.yoffset,letter.width,letter.height,color);
		cursorX += letter.xadvance;
	}
};
XTextRender.feedLineInformation = function(text,lines) {
	var line = 0;
	while(lines[line] == null) lines.push({ start : 0, width : 0, end : 0});
	lines[0].start = 0;
	var _g = 0;
	var _g1 = text.length;
	while(_g < _g1) {
		var i = _g++;
		var newLine = -1;
		if(HxOverrides.cca(text,i) == 10) {
			lines[line].end = i - 1;
			newLine = i + 1;
		}
		if(newLine >= 0) {
			++line;
			while(lines[line] == null) lines.push({ start : 0, width : 0, end : 0});
			lines[line].start = newLine;
		}
	}
	lines[line].end = text.length - 1;
	return line + 1;
};
var BitmapText = function() { };
BitmapText.__name__ = "BitmapText";
BitmapText.loadFont = function(fontName,imageName,fontData) {
	var image = imageName;
	var data = fontData;
	var letters = new haxe_ds_IntMap();
	var x = Xml.parse(data.toString()).firstElement();
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Invalid nodeType " + (x.nodeType == null ? "null" : XmlType.toString(x.nodeType)));
	}
	var this1 = x;
	var xml = this1;
	var spaceWidth = 8;
	var chars = haxe_xml__$Access_NodeAccess.resolve(xml,"chars");
	var _g = 0;
	var _g1 = haxe_xml__$Access_NodeListAccess.resolve(chars,"char");
	while(_g < _g1.length) {
		var char = _g1[_g];
		++_g;
		var letter = { id : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"id")), x : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"x")), y : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"y")), width : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"width")), height : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"height")), xoffset : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"xoffset")), yoffset : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"yoffset")), xadvance : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"xadvance")), kernings : new haxe_ds_IntMap()};
		if(letter.id == BitmapText.spaceCharCode) {
			spaceWidth = letter.xadvance;
		}
		letters.h[letter.id] = letter;
	}
	if(haxe_xml__$Access_HasNodeAccess.resolve(xml,"kernings")) {
		var kernings = haxe_xml__$Access_NodeAccess.resolve(xml,"kernings");
		var letter;
		var _g = 0;
		var _g1 = haxe_xml__$Access_NodeListAccess.resolve(kernings,"kerning");
		while(_g < _g1.length) {
			var kerning = _g1[_g];
			++_g;
			var key = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"first"));
			letter = letters.h[key];
			var this1 = letter.kernings;
			var key1 = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"second"));
			var value = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"amount"));
			this1.h[key1] = value;
		}
	}
	if(BitmapText.fontCache == null) {
		BitmapText.fontCache = new haxe_ds_StringMap();
	}
	var font = { size : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(xml,"info"),"size")), lineHeight : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(xml,"common"),"lineHeight")), spaceWidth : spaceWidth, image : image, letters : letters};
	BitmapText.fontCache.h[fontName] = font;
};
BitmapText.getFont = function(fontName) {
	return BitmapText.fontCache.h[fontName];
};
BitmapText.processFont = function(name,image,data) {
	var letters = new haxe_ds_IntMap();
	var x = Xml.parse(data.toString()).firstElement();
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Invalid nodeType " + (x.nodeType == null ? "null" : XmlType.toString(x.nodeType)));
	}
	var this1 = x;
	var xml = this1;
	var spaceWidth = 8;
	var chars = haxe_xml__$Access_NodeAccess.resolve(xml,"chars");
	var _g = 0;
	var _g1 = haxe_xml__$Access_NodeListAccess.resolve(chars,"char");
	while(_g < _g1.length) {
		var char = _g1[_g];
		++_g;
		var letter = { id : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"id")), x : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"x")), y : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"y")), width : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"width")), height : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"height")), xoffset : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"xoffset")), yoffset : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"yoffset")), xadvance : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(char,"xadvance")), kernings : new haxe_ds_IntMap()};
		if(letter.id == BitmapText.spaceCharCode) {
			spaceWidth = letter.xadvance;
		}
		letters.h[letter.id] = letter;
	}
	if(haxe_xml__$Access_HasNodeAccess.resolve(xml,"kernings")) {
		var kernings = haxe_xml__$Access_NodeAccess.resolve(xml,"kernings");
		var letter;
		var _g = 0;
		var _g1 = haxe_xml__$Access_NodeListAccess.resolve(kernings,"kerning");
		while(_g < _g1.length) {
			var kerning = _g1[_g];
			++_g;
			var key = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"first"));
			letter = letters.h[key];
			var this1 = letter.kernings;
			var key1 = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"second"));
			var value = Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(kerning,"amount"));
			this1.h[key1] = value;
		}
	}
	if(BitmapText.fontCache == null) {
		BitmapText.fontCache = new haxe_ds_StringMap();
	}
	var font = { size : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(xml,"info"),"size")), lineHeight : Std.parseInt(haxe_xml__$Access_AttribAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(xml,"common"),"lineHeight")), spaceWidth : spaceWidth, image : image, letters : letters};
	BitmapText.fontCache.h[name] = font;
};
var XmlType = {};
XmlType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "Element";
	case 1:
		return "PCData";
	case 2:
		return "CData";
	case 3:
		return "Comment";
	case 4:
		return "DocType";
	case 5:
		return "ProcessingInstruction";
	case 6:
		return "Document";
	}
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
Xml.__name__ = "Xml";
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h,att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.attributeMap.h);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			var tmp;
			if(child.nodeType == Xml.Element) {
				if(child.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				tmp = child.nodeName == name;
			} else {
				tmp = false;
			}
			if(tmp) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe_iterators_ArrayIterator(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) {
				return child;
			}
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Int32 = {};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
var haxe_Resource = function() { };
haxe_Resource.__name__ = "haxe.Resource";
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		var this1 = new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
		return this1;
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = "haxe.crypto.Base64";
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_crypto_Sha1 = function() {
};
haxe_crypto_Sha1.__name__ = "haxe.crypto.Sha1";
haxe_crypto_Sha1.make = function(b) {
	var h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(20));
	var p = 0;
	out.b[p++] = h[0] >>> 24;
	out.b[p++] = h[0] >> 16 & 255;
	out.b[p++] = h[0] >> 8 & 255;
	out.b[p++] = h[0] & 255;
	out.b[p++] = h[1] >>> 24;
	out.b[p++] = h[1] >> 16 & 255;
	out.b[p++] = h[1] >> 8 & 255;
	out.b[p++] = h[1] & 255;
	out.b[p++] = h[2] >>> 24;
	out.b[p++] = h[2] >> 16 & 255;
	out.b[p++] = h[2] >> 8 & 255;
	out.b[p++] = h[2] & 255;
	out.b[p++] = h[3] >>> 24;
	out.b[p++] = h[3] >> 16 & 255;
	out.b[p++] = h[3] >> 8 & 255;
	out.b[p++] = h[3] & 255;
	out.b[p++] = h[4] >>> 24;
	out.b[p++] = h[4] >> 16 & 255;
	out.b[p++] = h[4] >> 8 & 255;
	out.b[p++] = h[4] & 255;
	return out;
};
haxe_crypto_Sha1.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g = 0;
	var _g1 = nblk * 16;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var _g = 0;
	var _g1 = b.length;
	while(_g < _g1) {
		var i = _g++;
		var p = i >> 2;
		blks[p] |= b.b[i] << 24 - ((i & 3) << 3);
	}
	var i = b.length;
	var p = i >> 2;
	blks[p] |= 128 << 24 - ((i & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha1.prototype = {
	doEncode: function(x) {
		var w = [];
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			var j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					var num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				var t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t;
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	,ft: function(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	,kt: function(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
	,__class__: haxe_crypto_Sha1
};
var haxe_ds_BalancedTree = function() {
};
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_xml__$Access_NodeAccess = {};
haxe_xml__$Access_NodeAccess.resolve = function(this1,name) {
	var x = this1.elementsNamed(name).next();
	if(x == null) {
		var xname;
		if(this1.nodeType == Xml.Document) {
			xname = "Document";
		} else {
			if(this1.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
			}
			xname = this1.nodeName;
		}
		throw haxe_Exception.thrown(xname + " is missing element " + name);
	}
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Invalid nodeType " + (x.nodeType == null ? "null" : XmlType.toString(x.nodeType)));
	}
	var this1 = x;
	return this1;
};
var haxe_xml__$Access_AttribAccess = {};
haxe_xml__$Access_AttribAccess.resolve = function(this1,name) {
	if(this1.nodeType == Xml.Document) {
		throw haxe_Exception.thrown("Cannot access document attribute " + name);
	}
	var v = this1.get(name);
	if(v == null) {
		if(this1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
		}
		throw haxe_Exception.thrown(this1.nodeName + " is missing attribute " + name);
	}
	return v;
};
var haxe_xml__$Access_HasNodeAccess = {};
haxe_xml__$Access_HasNodeAccess.resolve = function(this1,name) {
	return this1.elementsNamed(name).hasNext();
};
var haxe_xml__$Access_NodeListAccess = {};
haxe_xml__$Access_NodeListAccess.resolve = function(this1,name) {
	var l = [];
	var x = this1.elementsNamed(name);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1.nodeType != Xml.Document && x1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Invalid nodeType " + (x1.nodeType == null ? "null" : XmlType.toString(x1.nodeType)));
		}
		var this1 = x1;
		l.push(this1);
	}
	return l;
};
var haxe_xml_XmlParserException = function(message,xml,position) {
	this.xml = xml;
	this.message = message;
	this.position = position;
	this.lineNumber = 1;
	this.positionAtLine = 0;
	var _g = 0;
	var _g1 = position;
	while(_g < _g1) {
		var i = _g++;
		var c = xml.charCodeAt(i);
		if(c == 10) {
			this.lineNumber++;
			this.positionAtLine = 0;
		} else if(c != 13) {
			this.positionAtLine++;
		}
	}
};
haxe_xml_XmlParserException.__name__ = "haxe.xml.XmlParserException";
haxe_xml_XmlParserException.prototype = {
	toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine;
	}
	,__class__: haxe_xml_XmlParserException
};
var haxe_xml_Parser = function() { };
haxe_xml_Parser.__name__ = "haxe.xml.Parser";
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) {
		strict = false;
	}
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) {
		p = 0;
	}
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(p < str.length) {
		var c = str.charCodeAt(p);
		switch(state) {
		case 0:
			switch(c) {
			case 9:case 10:case 13:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			if(c == 60) {
				state = 0;
				next = 2;
			} else {
				start = p;
				state = 13;
				continue;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <![CDATA[",str,p));
					}
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!DOCTYPE",str,p));
					}
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!--",str,p));
				} else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 47:
				if(parent == null) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				start = p + 1;
				state = 0;
				next = 10;
				break;
			case 63:
				state = 14;
				start = p;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				++nsubs;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected attribute name",str,p));
				}
				var tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Duplicate attribute [" + aname + "]",str,p));
				}
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			if(c == 61) {
				state = 0;
				next = 7;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected =",str,p));
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected \"",str,p));
			}
			break;
		case 8:
			switch(c) {
			case 38:
				var len = p - start;
				buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 60:case 62:
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid unescaped " + String.fromCodePoint(c) + " in attribute value",str,p));
				} else if(c == attrValQuote) {
					var len1 = p - start;
					buf.b += len1 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len1);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					var len2 = p - start;
					buf.b += len2 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len2);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				var v = HxOverrides.substr(str,start,p - start);
				if(parent == null || parent.nodeType != 0) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected </" + v + ">, tag is not open",str,p));
				}
				if(parent.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
				}
				if(v != parent.nodeName) {
					if(parent.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
					}
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected </" + parent.nodeName + ">",str,p));
				}
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 11:
			if(c == 62) {
				state = 1;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 12:
			if(c == 62) {
				if(nsubs == 0) {
					parent.addChild(Xml.createPCData(""));
				}
				return p;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 13:
			if(c == 60) {
				var len3 = p - start;
				buf.b += len3 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len3);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				++nsubs;
				state = 0;
				next = 2;
			} else if(c == 38) {
				var len4 = p - start;
				buf.b += len4 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len4);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				++p;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				++nsubs;
				state = 1;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) {
				++nbrackets;
			} else if(c == 93) {
				--nbrackets;
			} else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				state = 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1 = s.charCodeAt(1) == 120 ? Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)) : Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCodePoint(c1);
				} else if(!Object.prototype.hasOwnProperty.call(haxe_xml_Parser.escapes.h,s)) {
					if(strict) {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Undefined entity: " + s,str,p));
					}
					buf.b += Std.string("&" + s + ";");
				} else {
					buf.b += Std.string(haxe_xml_Parser.escapes.h[s]);
				}
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid character in entity: " + String.fromCodePoint(c),str,p));
				}
				buf.b += String.fromCodePoint(38);
				var len5 = p - start;
				buf.b += len5 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len5);
				--p;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		++p;
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(parent.nodeType == 0) {
			if(parent.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
			}
			throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unclosed node <" + parent.nodeName + ">",str,p));
		}
		if(p != start || nsubs == 0) {
			var len = p - start;
			buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
			parent.addChild(Xml.createPCData(buf.b));
			++nsubs;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += String.fromCodePoint(38);
		var len = p - start;
		buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
		parent.addChild(Xml.createPCData(buf.b));
		++nsubs;
		return p;
	}
	throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected end",str,p));
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
haxe_xml_Printer.__name__ = "haxe.xml.Printer";
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) {
		pretty = false;
	}
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			var attribute = value.attributes();
			while(attribute.hasNext()) {
				var attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				var input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				var _g_current = 0;
				var _g_array = value.children;
				while(_g_current < _g_array.length) {
					var child = _g_array[_g_current++];
					this.writeNode(child,this.pretty ? tabs + "\t" : tabs);
				}
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				var input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var commentContent = value.nodeValue;
			var _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			var input = StringTools.trim(commentContent);
			this.output.b += Std.string(input);
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var _g_current = 0;
			var _g_array = value.children;
			while(_g_current < _g_array.length) {
				var child = _g_array[_g_current++];
				this.writeNode(child,tabs);
			}
			break;
		}
	}
	,hasChildren: function(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		var _g_current = 0;
		var _g_array = value.children;
		while(_g_current < _g_array.length) {
			var child = _g_array[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js_Boot = function() { };
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = "js.Browser";
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		return null;
	}
};
var phaser_Phaser = function() { };
phaser_Phaser.__name__ = "phaser.Phaser";
$global.$haxeUID |= 0;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = "String";
Array.__name__ = "Array";
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
haxe_Resource.content = [{ name : "font12_fnt", data : "PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8Zm9udD4NCiAgPGluZm8gZmFjZT0iTm90byBTYW5zIEpQIiBzaXplPSIxNiIgYm9sZD0iMCIgaXRhbGljPSIwIiBjaGFyc2V0PSIiIHVuaWNvZGU9IjEiIHN0cmV0Y2hIPSIxMDAiIHNtb290aD0iMSIgYWE9IjEiIHBhZGRpbmc9IjAsMCwwLDAiIHNwYWNpbmc9IjEsMSIgb3V0bGluZT0iMCIvPg0KICA8Y29tbW9uIGxpbmVIZWlnaHQ9IjE2IiBiYXNlPSIxMyIgc2NhbGVXPSIyNTYiIHNjYWxlSD0iMjU2IiBwYWdlcz0iMSIgcGFja2VkPSIwIiBhbHBoYUNobmw9IjAiIHJlZENobmw9IjQiIGdyZWVuQ2hubD0iNCIgYmx1ZUNobmw9IjQiLz4NCiAgPHBhZ2VzPg0KICAgIDxwYWdlIGlkPSIwIiBmaWxlPSJmb250MTJfMC5wbmciIC8+DQogIDwvcGFnZXM+DQogIDxjaGFycyBjb3VudD0iOTUiPg0KICAgIDxjaGFyIGlkPSIzMiIgeD0iMTE2IiB5PSIxOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMCIgeGFkdmFuY2U9IjIiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzMyIgeD0iMTIzIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM0IiB4PSI2NSIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzUiIHg9Ijc5IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM2IiB4PSIyIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgeG9mZnNldD0iMCIgeW9mZnNldD0iMyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzNyIgeD0iMTI5IiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjExIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzgiIHg9IjE3OCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzOSIgeD0iNzciIHk9IjE5IiB3aWR0aD0iMiIgaGVpZ2h0PSI1IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQwIiB4PSI5IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0MSIgeD0iMzgiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQyIiB4PSI1OSIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDMiIHg9IjE5NiIgeT0iOSIgd2lkdGg9IjciIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NCIgeD0iODciIHk9IjE5IiB3aWR0aD0iMyIgaGVpZ2h0PSI0IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxMSIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NSIgeD0iMTEyIiB5PSIxOSIgd2lkdGg9IjMiIGhlaWdodD0iMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iOSIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NiIgeD0iMTAyIiB5PSIxOSIgd2lkdGg9IjIiIGhlaWdodD0iMiIgeG9mZnNldD0iMSIgeW9mZnNldD0iMTEiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDciIHg9IjE5IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0OCIgeD0iMTYwIiB5PSI5IiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ5IiB4PSIxNzQiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTAiIHg9IjIyOCIgeT0iMCIgd2lkdGg9IjciIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1MSIgeD0iNTUiIHk9IjExIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUyIiB4PSIyMjAiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9Ii0xIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUzIiB4PSI2MiIgeT0iMTEiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTQiIHg9IjgzIiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1NSIgeD0iMzIiIHk9IjEyIiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU2IiB4PSI2OSIgeT0iMTEiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTciIHg9IjEyNSIgeT0iMTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTgiIHg9IjI1MyIgeT0iOSIgd2lkdGg9IjIiIGhlaWdodD0iNiIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1OSIgeD0iMjUyIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjYwIiB4PSIwIiB5PSIyMyIgd2lkdGg9IjYiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2MSIgeD0iODAiIHk9IjE5IiB3aWR0aD0iNiIgaGVpZ2h0PSI0IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjYyIiB4PSIyNDYiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjMiIHg9IjE4MSIgeT0iOSIgd2lkdGg9IjUiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2NCIgeD0iNTAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjExIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjUiIHg9IjI0IiB5PSIxMiIgd2lkdGg9IjciIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2NiIgeD0iOTAiIHk9IjEwIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY3IiB4PSI0MCIgeT0iMTIiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjgiIHg9IjExOCIgeT0iMTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjkiIHg9Ijk3IiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MCIgeD0iMTA0IiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MSIgeD0iMTk2IiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjcyIiB4PSIyMDQiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzMiIHg9IjE5MyIgeT0iOSIgd2lkdGg9IjIiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3NCIgeD0iMTMyIiB5PSI5IiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSItMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3NSIgeD0iMjEyIiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc2IiB4PSIxNjciIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzciIHg9IjE1MSIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3OCIgeD0iNDgiIHk9IjEyIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc5IiB4PSIxNjkiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODAiIHg9Ijc2IiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4MSIgeD0iNjEiIHk9IjAiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjgyIiB4PSIyMzYiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODMiIHg9IjgiIHk9IjEzIiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg0IiB4PSIxODciIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9Ii0xIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg1IiB4PSIyNDQiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODYiIHg9IjAiIHk9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg3IiB4PSIxNDAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iMTAiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4OCIgeD0iMTYiIHk9IjEyIiB3aWR0aD0iNyIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg5IiB4PSIxNjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9Ii0xIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkwIiB4PSIxMTEiIHk9IjEwIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkxIiB4PSI0MiIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTIiIHg9IjI0IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5MyIgeD0iNDYiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk0IiB4PSI3MSIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTUiIHg9IjEwNSIgeT0iMTkiIHdpZHRoPSI2IiBoZWlnaHQ9IjEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjE0IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk2IiB4PSI5MSIgeT0iMTkiIHdpZHRoPSIzIiBoZWlnaHQ9IjQiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjMiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTciIHg9IjI4IiB5PSIyMSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5OCIgeD0iMTAwIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk5IiB4PSIyMzIiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTAwIiB4PSI5MyIgeT0iMCIgd2lkdGg9IjYiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDEiIHg9IjIzOSIgeT0iOSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDIiIHg9IjExMyIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDMiIHg9IjcxIiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNCIgeD0iMTA3IiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNSIgeD0iMTI2IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iMyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNiIgeD0iMTQiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSItMSIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjMiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDciIHg9Ijg2IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwOCIgeD0iMTE5IiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iMyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwOSIgeD0iMjA0IiB5PSI5IiB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iMTEiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTAiIHg9IjM1IiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNiIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTEiIHg9IjIyNCIgeT0iOSIgd2lkdGg9IjciIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTIiIHg9IjEzOSIgeT0iOSIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTMiIHg9IjE0NiIgeT0iOSIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTQiIHg9IjQxIiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNiIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTUiIHg9IjciIHk9IjIzIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB4b2Zmc2V0PSItMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTYiIHg9IjE4NyIgeT0iOSIgd2lkdGg9IjUiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTciIHg9IjQ3IiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNiIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTgiIHg9IjE0IiB5PSIyMiIgd2lkdGg9IjYiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTkiIHg9IjIxNCIgeT0iOSIgd2lkdGg9IjkiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjAiIHg9IjIxIiB5PSIyMSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjEiIHg9IjE1MyIgeT0iOSIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjIiIHg9IjUzIiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjMiIHg9IjI5IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjQiIHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEzIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSIzIiB4YWR2YW5jZT0iMyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNSIgeD0iMzQiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNiIgeD0iOTUiIHk9IjE5IiB3aWR0aD0iNiIgaGVpZ2h0PSIzIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iNiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogIDwvY2hhcnM+DQogIDxrZXJuaW5ncyBjb3VudD0iMTMzIj4NCiAgICA8a2VybmluZyBmaXJzdD0iMTIzIiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMjEiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM0IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzNCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzQiIHNlY29uZD0iNjUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM0IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMjEiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExOSIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE5IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTgiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExOCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE0IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTQiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExNCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTEyIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTIiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExMSIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTExIiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDciIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwNyIgc2Vjb25kPSI0NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAzIiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDMiIHNlY29uZD0iNjMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI4OSIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iODciIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9Ijg2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI4NCIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTgiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijk4IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5NyIgc2Vjb25kPSI0MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTIiIHNlY29uZD0iMTA2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkyIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5MiIgc2Vjb25kPSI4NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzkiIHNlY29uZD0iNDQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM5IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzOSIgc2Vjb25kPSI2NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzkiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkyIiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5MSIgc2Vjb25kPSIxMDYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTIyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExNSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTEzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjEwMyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTAxIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMDAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9Ijk5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI5NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NyIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODYiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg2IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NiIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODUiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjEyMiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTE3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExNCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTEzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDAiIHNlY29uZD0iMTA2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSIzOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iNDIiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMDkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMDMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjEwMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTAwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI5OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iOTciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjkwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSIxMTYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjExOCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNzQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MSIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iOTAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjgwIiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI2NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iNDciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjgwIiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzkiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjEyMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iMTE4IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9Ijg3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI4NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjYzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI0NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iNDIiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjM5IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSIzNCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzUiIHNlY29uZD0iMTE2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NSIgc2Vjb25kPSI0NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iMTIyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NSIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iNzQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDUiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2OSIgc2Vjb25kPSIxMjAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY4IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjUiIHNlY29uZD0iNDIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSIzOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iNDIiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSIzOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iODYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY1IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDciIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjExOCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iMTE2IiBhbW91bnQ9Ii0xIiAvPg0KICA8L2tlcm5pbmdzPg0KPC9mb250Pg0K"},{ name : "uigen_txt", data : "eyJsaW5lYXJMYXlvdXRzIjpbeyJob3Jpem9udGFsIjp0cnVlLCJzZXBhcmF0aW9uWCI6MjAsInNlcGFyYXRpb25ZIjoyMCwiY2hpbGRQaXZvdFkiOjAsImNoaWxkUGl2b3RYIjowLCJlbGVtZW50Ijp7ImlkIjoibWFpbmJ1dHRvbmdyb3VwIiwieCI6NjUsInkiOjQwMCwic2NyZWVuUGl2b3RZIjowLCJzY3JlZW5QaXZvdFgiOjAsIndpZHRoIjo3NzAsImhlaWdodCI6LTF9fSx7Imhvcml6b250YWwiOnRydWUsInNlcGFyYXRpb25YIjo1LCJzZXBhcmF0aW9uWSI6MTAsImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MCwiZWxlbWVudCI6eyJpZCI6InR1cm5vcmRlciIsIngiOjQ1NywieSI6Mjg1LCJzY3JlZW5QaXZvdFkiOjAsInNjcmVlblBpdm90WCI6MCwid2lkdGgiOjI3MCwiaGVpZ2h0IjowfX0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjoxMCwiY2hpbGRQaXZvdFgiOjAuNSwiY2hpbGRQaXZvdFkiOjAsImVsZW1lbnQiOnsiaWQiOiJkaWFsb2didXR0b24iLCJ4IjowLCJ5IjowLCJzY3JlZW5QaXZvdFkiOjAuNSwic2NyZWVuUGl2b3RYIjowLjUsIndpZHRoIjoyNzAsImhlaWdodCI6MH19LHsiaG9yaXpvbnRhbCI6dHJ1ZSwic2VwYXJhdGlvblgiOjE1LCJzZXBhcmF0aW9uWSI6MTUsImVsZW1lbnQiOnsiaWQiOiJlcXVpcGJ1dHRvbiIsIngiOjMzNCwieSI6MTY2LCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOi0xLCJoZWlnaHQiOi0xfSwiY2hpbGRQaXZvdFgiOjAsImNoaWxkUGl2b3RZIjowfSx7Imhvcml6b250YWwiOnRydWUsInNlcGFyYXRpb25YIjo0NSwic2VwYXJhdGlvblkiOjE1LCJlbGVtZW50Ijp7ImlkIjoidGFiYnV0dG9uIiwieCI6NTYsInkiOjAsInNjcmVlblBpdm90WCI6MCwic2NyZWVuUGl2b3RZIjowLCJ3aWR0aCI6LTEsImhlaWdodCI6MjJ9LCJjaGlsZFBpdm90WCI6MCwiY2hpbGRQaXZvdFkiOjB9LHsiaG9yaXpvbnRhbCI6ZmFsc2UsInNlcGFyYXRpb25YIjo0NSwic2VwYXJhdGlvblkiOjEwLCJlbGVtZW50Ijp7ImlkIjoiZXF1aXBwZWRidXR0b25zIiwieCI6MjIsInkiOjc1LCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOi0xLCJoZWlnaHQiOi0xfSwiY2hpbGRQaXZvdFgiOjAsImNoaWxkUGl2b3RZIjowfSx7Imhvcml6b250YWwiOmZhbHNlLCJzZXBhcmF0aW9uWCI6NDUsInNlcGFyYXRpb25ZIjoxMCwiZWxlbWVudCI6eyJpZCI6Im1pc2NlcXVpcGJ1dHRvbnMiLCJ4IjozMzQsInkiOi0yMiwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjEsIndpZHRoIjotMSwiaGVpZ2h0Ijo1MH0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjoxMCwiZWxlbWVudCI6eyJpZCI6ImxvZyIsIngiOjg3NiwieSI6NzUsInNjcmVlblBpdm90WCI6MCwic2NyZWVuUGl2b3RZIjowLCJ3aWR0aCI6LTEsImhlaWdodCI6LTF9LCJjaGlsZFBpdm90WCI6MCwiY2hpbGRQaXZvdFkiOjB9LHsiaG9yaXpvbnRhbCI6ZmFsc2UsInNlcGFyYXRpb25YIjowLCJzZXBhcmF0aW9uWSI6MywiZWxlbWVudCI6eyJpZCI6ImVxdWlwYWN0b3J2aWV3IiwieCI6MjIsInkiOjI5NSwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjAsIndpZHRoIjotMSwiaGVpZ2h0IjotMX0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjozLCJlbGVtZW50Ijp7ImlkIjoiZXF1aXBjdXJyZW5jeXZpZXciLCJ4IjoyMiwieSI6LTEwMCwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjEsIndpZHRoIjotMSwiaGVpZ2h0IjotMX0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjozLCJlbGVtZW50Ijp7ImlkIjoiZXF1aXBob3ZlciIsIngiOjIyMiwieSI6Mjk1LCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOjI4MCwiaGVpZ2h0IjotMX0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjoxNSwiZWxlbWVudCI6eyJpZCI6ImdlbmVyaWNob3ZlciIsIngiOjIyMiwieSI6Mjk1LCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOjI4MCwiaGVpZ2h0IjotMX0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjozLCJlbGVtZW50Ijp7ImlkIjoidGl0bGVidXR0b25zIiwieCI6NTAsInkiOjEwMCwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjAsIndpZHRoIjoxNTAsImhlaWdodCI6LTF9LCJjaGlsZFBpdm90WCI6MCwiY2hpbGRQaXZvdFkiOjB9LHsiaG9yaXpvbnRhbCI6ZmFsc2UsInNlcGFyYXRpb25YIjowLCJzZXBhcmF0aW9uWSI6MywiZWxlbWVudCI6eyJpZCI6InRpdGxlbG9nbyIsIngiOjIwMCwieSI6MCwic2NyZWVuUGl2b3RYIjowLjUsInNjcmVlblBpdm90WSI6MC41LCJ3aWR0aCI6MTUwLCJoZWlnaHQiOi0xfSwiY2hpbGRQaXZvdFgiOjAuNSwiY2hpbGRQaXZvdFkiOjAuNX0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjoxNSwiZWxlbWVudCI6eyJpZCI6ImFyZWEiLCJ4IjoyMDAsInkiOjUwLCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOjI1MCwiaGVpZ2h0IjozMH0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH0seyJob3Jpem9udGFsIjpmYWxzZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjoxNSwiZWxlbWVudCI6eyJpZCI6InN1YmJ1dHRvbnMiLCJ4Ijo1MTAsInkiOjUwLCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOi0xLCJoZWlnaHQiOjMwfSwiY2hpbGRQaXZvdFgiOjAsImNoaWxkUGl2b3RZIjowfSx7Imhvcml6b250YWwiOmZhbHNlLCJzZXBhcmF0aW9uWCI6MCwic2VwYXJhdGlvblkiOjcsImVsZW1lbnQiOnsiaWQiOiJyZWdpb25fcmVnaW9ucyIsIngiOjM1LCJ5Ijo3MCwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjAsIndpZHRoIjoyMzAsImhlaWdodCI6LTF9LCJjaGlsZFBpdm90WCI6MCwiY2hpbGRQaXZvdFkiOjB9LHsiaG9yaXpvbnRhbCI6dHJ1ZSwic2VwYXJhdGlvblgiOjAsInNlcGFyYXRpb25ZIjo3LCJlbGVtZW50Ijp7ImlkIjoicmVnaW9uX2FyZWFzIiwieCI6MjMyLCJ5Ijo3MCwic2NyZWVuUGl2b3RYIjowLCJzY3JlZW5QaXZvdFkiOjAsIndpZHRoIjozNDAsImhlaWdodCI6LTF9LCJjaGlsZFBpdm90WCI6MCwiY2hpbGRQaXZvdFkiOjB9LHsiaG9yaXpvbnRhbCI6ZmFsc2UsInNlcGFyYXRpb25YIjowLCJzZXBhcmF0aW9uWSI6MTUsImVsZW1lbnQiOnsiaWQiOiJyZWdpb25fZW5lbXkiLCJ4Ijo1NzIsInkiOjcwLCJzY3JlZW5QaXZvdFgiOjAsInNjcmVlblBpdm90WSI6MCwid2lkdGgiOjM0MCwiaGVpZ2h0IjotMX0sImNoaWxkUGl2b3RYIjowLCJjaGlsZFBpdm90WSI6MH1dfQ"},{ name : "Unnamed_fnt", data : "PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8Zm9udD4NCiAgPGluZm8gZmFjZT0iUGl4ZWxNcGx1czEwIiBzaXplPSIxMSIgYm9sZD0iMCIgaXRhbGljPSIwIiBjaGFyc2V0PSIiIHVuaWNvZGU9IjEiIHN0cmV0Y2hIPSIxMDAiIHNtb290aD0iMCIgYWE9IjEiIHBhZGRpbmc9IjAsMCwwLDAiIHNwYWNpbmc9IjEsMSIgb3V0bGluZT0iMCIvPg0KICA8Y29tbW9uIGxpbmVIZWlnaHQ9IjExIiBiYXNlPSI5IiBzY2FsZVc9IjI1NiIgc2NhbGVIPSIyNTYiIHBhZ2VzPSIxIiBwYWNrZWQ9IjAiIGFscGhhQ2hubD0iMCIgcmVkQ2hubD0iNCIgZ3JlZW5DaG5sPSI0IiBibHVlQ2hubD0iNCIvPg0KICA8cGFnZXM+DQogICAgPHBhZ2UgaWQ9IjAiIGZpbGU9IlVubmFtZWRfMC5wbmciIC8+DQogIDwvcGFnZXM+DQogIDxjaGFycyBjb3VudD0iMTI3Ij4NCiAgICA8Y2hhciBpZD0iMSIgeD0iMjUiIHk9IjE5IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjIiIHg9IjE2IiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzIiB4PSIyNiIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0IiB4PSIzOCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1IiB4PSI0MyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2IiB4PSI0OCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3IiB4PSIzIiB5PSIyMCIgd2lkdGg9IjQiIGhlaWdodD0iNCIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4IiB4PSIxMjAiIHk9IjgiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOSIgeD0iNTMiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTAiIHg9IjMyIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjExIiB4PSIxNTciIHk9IjgiIHdpZHRoPSIzIiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjAiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTIiIHg9IjE2MSIgeT0iOCIgd2lkdGg9IjMiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMyIgeD0iMTY5IiB5PSI4IiB3aWR0aD0iMyIgaGVpZ2h0PSI2IiB4b2Zmc2V0PSIyIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjE0IiB4PSIxNjUiIHk9IjgiIHdpZHRoPSIzIiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjAiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIwIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjE2IiB4PSI1NSIgeT0iMTgiIHdpZHRoPSI1IiBoZWlnaHQ9IjEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTciIHg9IjY3IiB5PSIxOCIgd2lkdGg9IjUiIGhlaWdodD0iMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMyIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxOCIgeD0iNjEiIHk9IjE4IiB3aWR0aD0iNSIgaGVpZ2h0PSIxIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjE5IiB4PSI0OSIgeT0iMTgiIHdpZHRoPSI1IiBoZWlnaHQ9IjEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMjAiIHg9IjQzIiB5PSIxOCIgd2lkdGg9IjUiIGhlaWdodD0iMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iOSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIyMSIgeD0iNiIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjAiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMjIiIHg9IjEwIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIyMyIgeD0iMTQ1IiB5PSI4IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIwIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjI0IiB4PSIxNTEiIHk9IjgiIHdpZHRoPSI1IiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMjUiIHg9IjE0IiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMiIgeW9mZnNldD0iMCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIyNiIgeD0iMTQyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjI3IiB4PSIxNDciIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMjgiIHg9IjI0MCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIyOSIgeD0iMTU3IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjMwIiB4PSIxNjIiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzEiIHg9IjkxIiB5PSIxOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgeG9mZnNldD0iMiIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzMiIgeD0iODMiIHk9IjE4IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiB4b2Zmc2V0PSItMSIgeW9mZnNldD0iMTAiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzMiIHg9IjE0MyIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iNyIgeG9mZnNldD0iMiIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzNCIgeD0iOCIgeT0iMjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjQiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzUiIHg9IjE3NyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzNiIgeD0iOTYiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzciIHg9IjE4MiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzOCIgeD0iMTg3IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM5IiB4PSIxNSIgeT0iMjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjQiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDAiIHg9Ijg1IiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSIxIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQxIiB4PSI4MSIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0MiIgeD0iMjQ1IiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI1IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIzIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQzIiB4PSIxOTAiIHk9IjgiIHdpZHRoPSI0IiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjMiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDQiIHg9IjQwIiB5PSIxOCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgeG9mZnNldD0iMSIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NSIgeD0iNzgiIHk9IjE4IiB3aWR0aD0iNCIgaGVpZ2h0PSIxIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ2IiB4PSI5MyIgeT0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDciIHg9IjEwMSIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0OCIgeD0iMjIyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ5IiB4PSIyNTIiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTAiIHg9IjIzMiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1MSIgeD0iMjM3IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUyIiB4PSIyNDIiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTMiIHg9IjI0NyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1NCIgeD0iMCIgeT0iMTIiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTUiIHg9IjUiIHk9IjEyIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU2IiB4PSIxMCIgeT0iMTIiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTciIHg9IjE1IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1OCIgeD0iMTciIHk9IjIwIiB3aWR0aD0iMSIgaGVpZ2h0PSI0IiB4b2Zmc2V0PSIyIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU5IiB4PSIwIiB5PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iNSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2MCIgeD0iMzAiIHk9IjEwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjYxIiB4PSIzMCIgeT0iMTgiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjIiIHg9IjE5NyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2MyIgeD0iMjAyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY0IiB4PSIyMjciIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjUiIHg9IjE1MiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2NiIgeD0iMjUiIHk9IjExIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY3IiB4PSIyMCIgeT0iMTEiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjgiIHg9IjIxNyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2OSIgeD0iMjEyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjcwIiB4PSIyMDciIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzEiIHg9IjE5MiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MiIgeD0iMTcyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjczIiB4PSIxMzkiIHk9IjgiIHdpZHRoPSIzIiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzQiIHg9IjE2NyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3NSIgeD0iMTM3IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc2IiB4PSIxMzIiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzciIHg9IjEyNyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3OCIgeD0iMTIyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc5IiB4PSIxMjUiIHk9IjgiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODAiIHg9Ijk1IiB5PSI5IiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjgxIiB4PSI2MyIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4MiIgeD0iMzUiIHk9IjEwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjgzIiB4PSI0MCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODQiIHg9IjExMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4NSIgeD0iNDUiIHk9IjEwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg2IiB4PSI1MCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODciIHg9IjExNiIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4OCIgeD0iNTUiIHk9IjEwIiB3aWR0aD0iNCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg5IiB4PSIxMzAiIHk9IjgiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTAiIHg9IjYwIiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5MSIgeD0iNzciIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTIiIHg9IjkxIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIyIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkzIiB4PSI3MyIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5NCIgeD0iMTkiIHk9IjIwIiB3aWR0aD0iNSIgaGVpZ2h0PSIzIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk1IiB4PSI3MyIgeT0iMTgiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjkiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTYiIHg9IjEyIiB5PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgeG9mZnNldD0iMSIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5NyIgeD0iMjIwIiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI1IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk4IiB4PSI3MCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjIiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTkiIHg9IjIwNSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDAiIHg9Ijc1IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDEiIHg9IjIzMCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDIiIHg9IjgwIiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDMiIHg9Ijg1IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDQiIHg9IjkwIiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDUiIHg9IjEwNiIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iOCIgeG9mZnNldD0iMSIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDYiIHg9IjIyIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDciIHg9IjEwMCIgeT0iOSIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDgiIHg9IjEzNSIgeT0iOCIgd2lkdGg9IjMiIGhlaWdodD0iNyIgeG9mZnNldD0iMSIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDkiIHg9IjE3MyIgeT0iOCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTAiIHg9IjI1MCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTEiIHg9IjE4NSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTIiIHg9IjY1IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTMiIHg9IjEwNSIgeT0iOSIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTQiIHg9IjE5NSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTUiIHg9IjIwMCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTYiIHg9IjExMCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTciIHg9IjIxMCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTgiIHg9IjIxNSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTkiIHg9IjE3OSIgeT0iOCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjAiIHg9IjIyNSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjEiIHg9IjExNSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjIiIHg9IjIzNSIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iNSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjMiIHg9IjY4IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNCIgeD0iODkiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjEiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTI1IiB4PSI1OCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjYiIHg9IjM1IiB5PSIxOCIgd2lkdGg9IjQiIGhlaWdodD0iMiIgeG9mZnNldD0iMCIgeW9mZnNldD0iMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjciIHg9Ijg3IiB5PSIxOCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgeG9mZnNldD0iLTEiIHlvZmZzZXQ9IjEwIiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogIDwvY2hhcnM+DQo8L2ZvbnQ+DQo"},{ name : "font14_fnt", data : "PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8Zm9udD4NCiAgPGluZm8gZmFjZT0iTm90byBTYW5zIEpQIiBzaXplPSIxOCIgYm9sZD0iMCIgaXRhbGljPSIwIiBjaGFyc2V0PSIiIHVuaWNvZGU9IjEiIHN0cmV0Y2hIPSIxMDAiIHNtb290aD0iMSIgYWE9IjEiIHBhZGRpbmc9IjAsMCwwLDAiIHNwYWNpbmc9IjEsMSIgb3V0bGluZT0iMCIvPg0KICA8Y29tbW9uIGxpbmVIZWlnaHQ9IjE3IiBiYXNlPSIxNCIgc2NhbGVXPSIyNTYiIHNjYWxlSD0iMjU2IiBwYWdlcz0iMSIgcGFja2VkPSIwIiBhbHBoYUNobmw9IjAiIHJlZENobmw9IjQiIGdyZWVuQ2hubD0iNCIgYmx1ZUNobmw9IjQiLz4NCiAgPHBhZ2VzPg0KICAgIDxwYWdlIGlkPSIwIiBmaWxlPSJmb250MTRfMC5wbmciIC8+DQogIDwvcGFnZXM+DQogIDxjaGFycyBjb3VudD0iOTUiPg0KICAgIDxjaGFyIGlkPSIzMiIgeD0iMjU0IiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIwIiB4YWR2YW5jZT0iMyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjMzIiB4PSIxNTEiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM0IiB4PSIxMjQiIHk9IjIxIiB3aWR0aD0iNSIgaGVpZ2h0PSI0IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM1IiB4PSI5OSIgeT0iMCIgd2lkdGg9IjYiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzYiIHg9IjIiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEzIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIzIiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM3IiB4PSIxNzQiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iMTIiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzOCIgeD0iMTg2IiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM5IiB4PSIxMzAiIHk9IjIxIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQwIiB4PSIxNSIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iMTMiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDEiIHg9IjIwIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0MiIgeD0iMTA3IiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0MyIgeD0iMzIiIHk9IjIzIiB3aWR0aD0iNyIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ0IiB4PSIxMTMiIHk9IjIxIiB3aWR0aD0iMyIgaGVpZ2h0PSI1IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxMiIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NSIgeD0iMTU1IiB5PSIyMSIgd2lkdGg9IjMiIGhlaWdodD0iMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iMTAiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDYiIHg9IjE0NCIgeT0iMjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjEyIiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ3IiB4PSIzMCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDgiIHg9IjUxIiB5PSIxMyIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0OSIgeD0iMjAwIiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1MCIgeD0iNTkiIHk9IjEyIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUxIiB4PSI2NyIgeT0iMTIiIHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTIiIHg9Ijc1IiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1MyIgeD0iODMiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU0IiB4PSIxMzkiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU1IiB4PSI5MSIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTYiIHg9Ijk5IiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1NyIgeD0iMTA3IiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1OCIgeD0iODEiIHk9IjIxIiB3aWR0aD0iMiIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU5IiB4PSIxNDciIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjYwIiB4PSI5MiIgeT0iMjEiIHdpZHRoPSI3IiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjEiIHg9IjExNyIgeT0iMjEiIHdpZHRoPSI2IiBoZWlnaHQ9IjQiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjIiIHg9Ijg0IiB5PSIyMSIgd2lkdGg9IjciIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2MyIgeD0iMTkzIiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2NCIgeD0iNTIiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjEyIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjUiIHg9IjkiIHk9IjE0IiB3aWR0aD0iOCIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY2IiB4PSIxMzEiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY3IiB4PSIyNDIiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjgiIHg9IjM1IiB5PSIxMyIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2OSIgeD0iMjE0IiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MCIgeD0iMTg2IiB5PSIxMCIgd2lkdGg9IjYiIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MSIgeD0iMTQ3IiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MiIgeD0iMTU1IiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MyIgeD0iMjUxIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc0IiB4PSIyMDciIHk9IjEwIiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc1IiB4PSIyMzMiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzYiIHg9IjE3OSIgeT0iMTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzciIHg9IjE5NiIgeT0iMCIgd2lkdGg9IjkiIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjEwIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzgiIHg9IjI3IiB5PSIxMyIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3OSIgeD0iMCIgeT0iMTUiIHdpZHRoPSI4IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODAiIHg9IjEyMyIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODEiIHg9IjY1IiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4MiIgeD0iMjE1IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjgzIiB4PSIxMTUiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg0IiB4PSIyMDYiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODUiIHg9IjQzIiB5PSIxMyIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4NiIgeD0iMTgiIHk9IjE0IiB3aWR0aD0iOCIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg3IiB4PSIxNjIiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iMTEiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4OCIgeD0iMTcxIiB5PSIxMCIgd2lkdGg9IjciIGhlaWdodD0iOSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4OSIgeD0iMjI0IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkwIiB4PSIxNjMiIHk9IjEwIiB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkxIiB4PSI0NSIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTIiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTIiIHg9IjM1IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5MyIgeD0iNDkiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEyIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk0IiB4PSIxMDAiIHk9IjIxIiB3aWR0aD0iNiIgaGVpZ2h0PSI1IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk1IiB4PSIxNDciIHk9IjIxIiB3aWR0aD0iNyIgaGVpZ2h0PSIxIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSIxNSIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5NiIgeD0iMTQwIiB5PSIyMSIgd2lkdGg9IjMiIGhlaWdodD0iMyIgeG9mZnNldD0iMiIgeW9mZnNldD0iMyIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5NyIgeD0iNDciIHk9IjIzIiB3aWR0aD0iNiIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk4IiB4PSIxMjciIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk5IiB4PSI2MSIgeT0iMjIiIHdpZHRoPSI2IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTAwIiB4PSIxMjAiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwMSIgeD0iOCIgeT0iMjUiIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTAyIiB4PSIxNDEiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwMyIgeD0iODMiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNCIgeD0iMTEzIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDUiIHg9IjE1OSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTA2IiB4PSIxMCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iMTMiIHhvZmZzZXQ9Ii0xIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNyIgeD0iNzUiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwOCIgeD0iMTU1IiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDkiIHg9IjIzOCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iMTIiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTAiIHg9IjI0OSIgeT0iMTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTExIiB4PSIxNiIgeT0iMjQiIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTEyIiB4PSIxMDYiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI3IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjExMyIgeD0iMTM0IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTQiIHg9Ijc1IiB5PSIyMSIgd2lkdGg9IjUiIGhlaWdodD0iNyIgeG9mZnNldD0iMSIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTUiIHg9IjQwIiB5PSIyMyIgd2lkdGg9IjYiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTYiIHg9IjIyMSIgeT0iMTAiIHdpZHRoPSI1IiBoZWlnaHQ9IjkiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE3IiB4PSI1NCIgeT0iMjMiIHdpZHRoPSI2IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE4IiB4PSIyNCIgeT0iMjQiIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE5IiB4PSIyMjciIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjEwIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTIwIiB4PSIwIiB5PSIyNSIgd2lkdGg9IjciIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjEiIHg9IjkxIiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjIiIHg9IjY4IiB5PSIyMiIgd2lkdGg9IjYiIGhlaWdodD0iNyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNyIgeGFkdmFuY2U9IjYiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjMiIHg9IjQwIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNCIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjQiIHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjE0IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSIzIiB4YWR2YW5jZT0iNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNSIgeD0iMjQiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEyIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNiIgeD0iMTMzIiB5PSIyMSIgd2lkdGg9IjYiIGhlaWdodD0iMyIgeG9mZnNldD0iMSIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjciIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICA8L2NoYXJzPg0KICA8a2VybmluZ3MgY291bnQ9IjE2MSI+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEyMyIgc2Vjb25kPSIxMDYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTIxIiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzNCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzQiIHNlY29uZD0iNDYiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM0IiBzZWNvbmQ9IjY1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzNCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTIxIiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMjEiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEyMCIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE5IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTkiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExOCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE4IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTgiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExNCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE0IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTQiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExMiIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTEyIiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTEiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExMSIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTA3IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDciIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMyIgc2Vjb25kPSIxMDYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAzIiBzZWNvbmQ9IjYzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iMTI1IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI5MyIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iOTIiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI4NyIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iODYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9Ijg0IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzOSIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzkiIHNlY29uZD0iNDYiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM5IiBzZWNvbmQ9IjY1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzOSIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9IjQxIiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSIzOSIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iMzQiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTgiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijk4IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5NyIgc2Vjb25kPSI0MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTIiIHNlY29uZD0iMTA2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkyIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5MiIgc2Vjb25kPSI4NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTIiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkxIiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMjIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjEyMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTE3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExNSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTE0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExMiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTExIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjEwOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTAzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMDEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjEwMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iOTkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9Ijk3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNDciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQwIiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSIzNCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iMzkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjQyIiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSI4NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iODkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODciIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg3IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NyIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODYiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjExNiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iMTE4IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NiIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODYiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg1IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMjIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExNyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTE1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExMyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTEyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTA5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMDMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjEwMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTAwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI5OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iOTciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjkwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNjUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MSIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iOTciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjgwIiBzZWNvbmQ9IjkwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDUiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjgwIiBzZWNvbmQ9IjY1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI0NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iNDYiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ1IiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzkiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjEyMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iMTE5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSIxMTgiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSIzOSIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iNDIiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iODYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9Ijg3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSI4OSIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9Ijg3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI4NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjYzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI0NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iMTE2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSIxMTgiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjQyIiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSIzOSIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iMzQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc1IiBzZWNvbmQ9IjExNiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzUiIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc1IiBzZWNvbmQ9IjQyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iMTIyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSI5NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iNzQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9IjY1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSI0NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iNDYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2OSIgc2Vjb25kPSIxMjAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY4IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjUiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY1IiBzZWNvbmQ9IjQyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSIzOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjUiIHNlY29uZD0iMzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ3IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NyIgc2Vjb25kPSI2NSIgYW1vdW50PSItMSIgLz4NCiAgPC9rZXJuaW5ncz4NCjwvZm9udD4NCg"},{ name : "font16_fnt", data : "PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8Zm9udD4NCiAgPGluZm8gZmFjZT0iTm90byBTYW5zIEpQIiBzaXplPSIyMCIgYm9sZD0iMCIgaXRhbGljPSIwIiBjaGFyc2V0PSIiIHVuaWNvZGU9IjEiIHN0cmV0Y2hIPSIxMDAiIHNtb290aD0iMSIgYWE9IjEiIHBhZGRpbmc9IjAsMCwwLDAiIHNwYWNpbmc9IjEsMSIgb3V0bGluZT0iMCIvPg0KICA8Y29tbW9uIGxpbmVIZWlnaHQ9IjIwIiBiYXNlPSIxNiIgc2NhbGVXPSIyNTYiIHNjYWxlSD0iMjU2IiBwYWdlcz0iMSIgcGFja2VkPSIwIiBhbHBoYUNobmw9IjAiIHJlZENobmw9IjQiIGdyZWVuQ2hubD0iNCIgYmx1ZUNobmw9IjQiLz4NCiAgPHBhZ2VzPg0KICAgIDxwYWdlIGlkPSIwIiBmaWxlPSJmb250MTZfMC5wbmciIC8+DQogIDwvcGFnZXM+DQogIDxjaGFycyBjb3VudD0iOTUiPg0KICAgIDxjaGFyIGlkPSIzMiIgeD0iMjIwIiB5PSIyMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMCIgeGFkdmFuY2U9IjMiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzMyIgeD0iMTY2IiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzNCIgeD0iMTc1IiB5PSIyMyIgd2lkdGg9IjciIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzNSIgeD0iMTc3IiB5PSIxMiIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzYiIHg9IjIiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjE0IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI0IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjM3IiB4PSIxNzgiIHk9IjAiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjEzIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMzgiIHg9IjIwNSIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iMTAiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIzOSIgeD0iMTgzIiB5PSIyMyIgd2lkdGg9IjMiIGhlaWdodD0iNiIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0MCIgeD0iMjciIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjE0IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQxIiB4PSIzMiIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTQiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDIiIHg9IjE2NyIgeT0iMjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjYiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDMiIHg9IjE0NCIgeT0iMjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDQiIHg9IjE5NSIgeT0iMjIiIHdpZHRoPSIzIiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjE0IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjQ1IiB4PSIyMTUiIHk9IjIyIiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSIxMiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0NiIgeD0iMjEyIiB5PSIyMiIgd2lkdGg9IjIiIGhlaWdodD0iMyIgeG9mZnNldD0iMSIgeW9mZnNldD0iMTMiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDciIHg9IjE2IiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSIxNCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI0OCIgeD0iMTA1IiB5PSIxMiIgd2lkdGg9IjgiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNDkiIHg9IjE4NSIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUwIiB4PSI2OSIgeT0iMTMiIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjUxIiB4PSIwIiB5PSIyOCIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTIiIHg9IjUwIiB5PSIxNCIgd2lkdGg9IjkiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTMiIHg9IjIzMyIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU0IiB4PSI4IiB5PSIyOCIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTUiIHg9IjIyNSIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjU2IiB4PSIyMTciIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI1NyIgeD0iMTMyIiB5PSIxMiIgd2lkdGg9IjgiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTgiIHg9IjEzMiIgeT0iMjMiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNTkiIHg9IjE3NCIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjAiIHg9IjE1MiIgeT0iMjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjEiIHg9IjE4NyIgeT0iMjIiIHdpZHRoPSI3IiBoZWlnaHQ9IjUiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjkiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjIiIHg9IjEzNSIgeT0iMjMiIHdpZHRoPSI4IiBoZWlnaHQ9IjciIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjMiIHg9IjE1OSIgeT0iMCIgd2lkdGg9IjYiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI3IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjQiIHg9IjY3IiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSIxNCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjY1IiB4PSIwIiB5PSIxNyIgd2lkdGg9IjkiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjYiIHg9IjE2OCIgeT0iMTIiIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iMTAiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2NyIgeD0iMzAiIHk9IjE1IiB3aWR0aD0iOSIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI2OCIgeD0iODciIHk9IjEzIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjEwIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNjkiIHg9IjIwOSIgeT0iMTEiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjcwIiB4PSIxOTMiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MSIgeD0iMjM4IiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjEwIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzIiIHg9IjE1OSIgeT0iMTIiIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iMTEiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3MyIgeD0iMTYiIHk9IjI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3NCIgeD0iMjQxIiB5PSIxMSIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzUiIHg9IjEwIiB5PSIxNSIgd2lkdGg9IjkiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSIxMCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc2IiB4PSIyMDEiIHk9IjExIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI3NyIgeD0iMjI3IiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSIxMiIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijc4IiB4PSIxNDEiIHk9IjEyIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjEwIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iNzkiIHg9IjIxNiIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iMTEiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4MCIgeD0iNjAiIHk9IjE0IiB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMSIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4MSIgeD0iMzYiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMyIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjExIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODIiIHg9IjQwIiB5PSIxNCIgd2lkdGg9IjkiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSIxMCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjgzIiB4PSIxMTQiIHk9IjEyIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI4NCIgeD0iMTIzIiB5PSIxMiIgd2lkdGg9IjgiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODUiIHg9Ijk2IiB5PSIxMiIgd2lkdGg9IjgiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSIxMCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg2IiB4PSIyMCIgeT0iMTUiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg3IiB4PSIxOTIiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNiIgeGFkdmFuY2U9IjEzIiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iODgiIHg9IjE1MCIgeT0iMTIiIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijg5IiB4PSI3OCIgeT0iMTMiIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkwIiB4PSIyNDgiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI2IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjkxIiB4PSI2NCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMTMiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTIiIHg9IjEwIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSIxNCIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjUiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5MyIgeD0iNjAiIHk9IjAiIHdpZHRoPSIzIiBoZWlnaHQ9IjEzIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk0IiB4PSIxNjAiIHk9IjIzIiB3aWR0aD0iNiIgaGVpZ2h0PSI3IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOCIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9Ijk1IiB4PSIyIiB5PSIxNSIgd2lkdGg9IjciIGhlaWdodD0iMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iMTciIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTYiIHg9IjE5OSIgeT0iMjIiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjMiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iOTciIHg9Ijg4IiB5PSIyNCIgd2lkdGg9IjciIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5OCIgeD0iMTI4IiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSI5OSIgeD0iNDMiIHk9IjI1IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwMCIgeD0iMTM2IiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDEiIHg9Ijc5IiB5PSIyNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDIiIHg9IjE1MiIgeT0iMCIgd2lkdGg9IjYiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTAzIiB4PSI5NCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTA0IiB4PSIxMjAiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEwNSIgeD0iMTcwIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMCIgeW9mZnNldD0iNSIgeGFkdmFuY2U9IjQiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMDYiIHg9IjIyIiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSIxNCIgeG9mZnNldD0iLTEiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTA3IiB4PSI4MCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iMTIiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTA4IiB4PSI4OSIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTA5IiB4PSIxOSIgeT0iMjYiIHdpZHRoPSIxMSIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iMTMiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTAiIHg9IjEwNCIgeT0iMjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTExIiB4PSI1MiIgeT0iMjUiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTEyIiB4PSIxNDQiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjExIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iOSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjExMyIgeD0iMTEyIiB5PSIwIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMSIgeG9mZnNldD0iMSIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjkiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMTQiIHg9IjEyNiIgeT0iMjMiIHdpZHRoPSI1IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjEiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE1IiB4PSIxMTkiIHk9IjIzIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjExNiIgeD0iMjQ5IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMTAiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjYiIHhhZHZhbmNlPSI2IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE3IiB4PSI2MSIgeT0iMjUiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI5IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE4IiB4PSI3MCIgeT0iMjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTE5IiB4PSIzMSIgeT0iMjYiIHdpZHRoPSIxMSIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iMTIiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjAiIHg9Ijk2IiB5PSIyMyIgd2lkdGg9IjciIGhlaWdodD0iOCIgeG9mZnNldD0iMCIgeW9mZnNldD0iOCIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICAgIDxjaGFyIGlkPSIxMjEiIHg9IjEwMyIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iMTEiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjgiIHhhZHZhbmNlPSI4IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTIyIiB4PSIxMTIiIHk9IjIzIiB3aWR0aD0iNiIgaGVpZ2h0PSI4IiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSI4IiB4YWR2YW5jZT0iNyIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyMyIgeD0iNTQiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEzIiB4b2Zmc2V0PSIwIiB5b2Zmc2V0PSI1IiB4YWR2YW5jZT0iNSIgcGFnZT0iMCIgY2hubD0iMTUiIC8+DQogICAgPGNoYXIgaWQ9IjEyNCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMTYiIHhvZmZzZXQ9IjIiIHlvZmZzZXQ9IjQiIHhhZHZhbmNlPSI0IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTI1IiB4PSI0OCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iMTMiIHhvZmZzZXQ9IjAiIHlvZmZzZXQ9IjUiIHhhZHZhbmNlPSI1IiBwYWdlPSIwIiBjaG5sPSIxNSIgLz4NCiAgICA8Y2hhciBpZD0iMTI2IiB4PSIyMDQiIHk9IjIyIiB3aWR0aD0iNyIgaGVpZ2h0PSIzIiB4b2Zmc2V0PSIxIiB5b2Zmc2V0PSIxMCIgeGFkdmFuY2U9IjgiIHBhZ2U9IjAiIGNobmw9IjE1IiAvPg0KICA8L2NoYXJzPg0KICA8a2VybmluZ3MgY291bnQ9IjE5NCI+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEyMyIgc2Vjb25kPSIxMDYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTIxIiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzNCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzQiIHNlY29uZD0iNDYiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM0IiBzZWNvbmQ9IjY1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzNCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTIxIiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMjEiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEyMCIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE5IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTkiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExOCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE4IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTgiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExNiIgc2Vjb25kPSI2MyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE2IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTUiIHNlY29uZD0iNDIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExNCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTE0IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTQiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExMiIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTEyIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTIiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjExMSIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTExIiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMTEiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwNyIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTA3IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDMiIHNlY29uZD0iMTA2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMyIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAzIiBzZWNvbmQ9IjYzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDMiIHNlY29uZD0iNDciIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9IjEyNSIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iOTMiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzkiIHNlY29uZD0iNDQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjM5IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIzOSIgc2Vjb25kPSI2NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMzkiIHNlY29uZD0iNzQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI5MiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iODkiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9Ijg3IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI4NiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iODQiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMiIgc2Vjb25kPSI0MSIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSIxMDIiIHNlY29uZD0iMzkiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iMTAyIiBzZWNvbmQ9IjM0IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjEwMSIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTgiIHNlY29uZD0iOTIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijk4IiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5OCIgc2Vjb25kPSI4NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTciIHNlY29uZD0iNDIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkyIiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5MiIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iOTIiIHNlY29uZD0iODYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjkyIiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI5MSIgc2Vjb25kPSIxMDYiIGFtb3VudD0iMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTIyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMjAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExNyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTE2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExNCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTEzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjExMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDAiIHNlY29uZD0iMTA2IiBhbW91bnQ9IjEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSIzOSIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iNDIiIGFtb3VudD0iLTMiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMTAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9Ijg2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSI4NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDQiIHNlY29uZD0iODkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjEwOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iMTAzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMDEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSIxMDAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9Ijk5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NCIgc2Vjb25kPSIxMTYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ0IiBzZWNvbmQ9IjExOCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iOTciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI1OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNTgiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OSIgc2Vjb25kPSI0NiIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODkiIHNlY29uZD0iNDUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg5IiBzZWNvbmQ9IjQ0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4OCIgc2Vjb25kPSI0NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODciIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg3IiBzZWNvbmQ9IjQ2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NyIgc2Vjb25kPSI0NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODYiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg2IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NiIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODYiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg1IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMjIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExNyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTE1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExMyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTEyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMTEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjExMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iMTA5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSIxMDMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjEwMSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDUiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjEwMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iOTkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ1IiBzZWNvbmQ9Ijg4IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NSIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iOTciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjkwIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNjUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSIzNCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iMzkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjQyIiBhbW91bnQ9Ii0zIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSI4NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODQiIHNlY29uZD0iNDYiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9Ijg2IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NiIgc2Vjb25kPSI4NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iODkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijg0IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4NCIgc2Vjb25kPSI0NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODEiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjEwNiIgYW1vdW50PSIxIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI5NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iOTAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjQ2IiBzZWNvbmQ9IjExNiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNDYiIHNlY29uZD0iMTE4IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iNjUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjgwIiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI4MCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iODAiIHNlY29uZD0iNDQiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc5IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSIxMjEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjExOSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iMTE4IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9Ijg3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI4NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iODUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9Ijg0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI4MSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iNzkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjcxIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI2NyIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iNjMiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NiIgc2Vjb25kPSI0MiIgYW1vdW50PSItMyIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzYiIHNlY29uZD0iMzkiIGFtb3VudD0iLTIiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc2IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0yIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3NSIgc2Vjb25kPSIxMTYiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc1IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NyIgc2Vjb25kPSI2NSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzUiIHNlY29uZD0iNDIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9Ijc0IiBzZWNvbmQ9Ijc0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI0NyIgc2Vjb25kPSI3NCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iMTIyIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSIxMjAiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9Ijk3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSI3NCIgYW1vdW50PSItMiIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iNjUiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjcwIiBzZWNvbmQ9IjQ3IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI3MCIgc2Vjb25kPSI0NiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNzAiIHNlY29uZD0iNDQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY5IiBzZWNvbmQ9IjEyMCIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjgiIHNlY29uZD0iNzQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY3IiBzZWNvbmQ9IjExNiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjciIHNlY29uZD0iODEiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY3IiBzZWNvbmQ9Ijc5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NyIgc2Vjb25kPSI3MSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjciIHNlY29uZD0iNjciIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY3IiBzZWNvbmQ9IjQ1IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSI5MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjUiIHNlY29uZD0iODQiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY1IiBzZWNvbmQ9IjYzIiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI2NSIgc2Vjb25kPSI0MiIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNjUiIHNlY29uZD0iMzkiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjY1IiBzZWNvbmQ9IjM0IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI1OSIgc2Vjb25kPSI4OSIgYW1vdW50PSItMSIgLz4NCiAgICA8a2VybmluZyBmaXJzdD0iNTkiIHNlY29uZD0iNDIiIGFtb3VudD0iLTEiIC8+DQogICAgPGtlcm5pbmcgZmlyc3Q9IjU4IiBzZWNvbmQ9Ijg5IiBhbW91bnQ9Ii0xIiAvPg0KICAgIDxrZXJuaW5nIGZpcnN0PSI1OCIgc2Vjb25kPSI0MiIgYW1vdW50PSItMSIgLz4NCiAgPC9rZXJuaW5ncz4NCjwvZm9udD4NCg"}];
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
seedyrng_Xorshift128Plus.PARAMETER_A = 23;
seedyrng_Xorshift128Plus.PARAMETER_B = 17;
seedyrng_Xorshift128Plus.PARAMETER_C = 26;
seedyrng_Xorshift128Plus.SEED_1 = (function($this) {
	var $r;
	var this1 = new haxe__$Int64__$_$_$Int64(842650776,685298713);
	$r = this1;
	return $r;
}(this));
Generation.random = new seedyrng_Random();
GRIControl.key = "save data master";
GRIControl.keyBackup = "save backup";
GRIControlRegion.listStandard = 0;
GRIControlRegion.listDanger = 1;
GRIControlRegion.dataRegionB = "regionbutton";
GRIControlRegion.dataAreaB = "areabutton";
GRIControlRegion.enemyRegionNames = ["Lagrima Continent","Wolf Fields","Tonberry's Lair","Altar Cave","Bikanel Island","Tartarus","Witchhunter Base","Highsalem","Witchhunter Guild"];
TurnOrderData.charaSprites = [Sprite.create("heroicon",512,512),Sprite.create("enemyicon",512,512),Sprite.create("boss",512,512),Sprite.create("bossb",512,512)];
GRIView.COLOR_BLACK = 0;
GRIView.COLOR_BACKGROUND = 988450;
GRIView.COLOR_BACKGROUND_GRAY = 1779241;
GRIView.COLOR_OUTLINE = 3824248;
GRIView.COLOR_TAB = 10390166;
GRIView.COLOR_TAB_HOVER = 11004149;
GRIView.COLOR_BUFF = 38655;
GRIView.COLOR_DEBUFF = 10298857;
GRIView.COLOR_TEXT_NORMAL = 5854292;
GRIView.COLOR_TEXT_HEADER = 2188254;
GRIView.COLOR_TEXT_ACTION = 15375794;
GRIView.LAYER_BACKGROUND = 0;
GRIView.LAYER_DEFAULT = 1;
GRIView.LAYER_HOVER = 2;
GRIView.LAYER_DIALOG = 3;
GRIView.ARCHETYPE_SIMPLE = "simple";
GRIView.ARCHETYPE_TEXT_ACTION = "actiontext";
GRIView.ARCHETYPE_SIMPLE_MEDIUM = "simplemedium";
GRIView.ARCHETYPE_SIMPLE_TIMID = "simpletimid";
GRIView.ARCHETYPE_IMPORTANT_TIMID = "importanttimid";
GRIView.ARCHETYPE_HEADER = "header";
GRIView.ARCHETYPE_HEADER_HOVER = "header";
GRIView.ARCHETYPE_HEADER_TIMID = "headertimid";
GRIView.ARCHETYPE_HEADER_STAT = "statheader";
GRIView.ARCHETYPE_BG_DEFAULT = "background";
GRIView.ARCHETYPE_BG_SIMPLE = "backgroundsimple";
GRIView.ARCHETYPE_BUTTON_SMALL = "buttonsmall";
GRIView.ARCHETYPE_BUTTON_SMALL_LABEL = "buttonsmall_label";
GRIView.ARCHETYPE_BUTTON_TAB = "buttontab";
GRIView.ARCHETYPE_BUTTON_REGION = GRIView.ARCHETYPE_BUTTON_SMALL_LABEL;
GRIView.SPRITE_BLUEGRAD = Sprite.create("bluegradient",32,32);
GRIView.SPRITE_PINKGRAD = Sprite.create("pinkgradient",32,32);
GRIView.SPRITE_GREENGRAD = Sprite.create("greengradient",32,32);
GRIView.LAYOUT_HOVER = "generichover";
GRIView.tagTabBattle = "tabbattle";
GRIView.tagTabEquip = "tabequip";
GRIView.tagTabRegion = "tabregion";
GRIView.tagTabTitle = "tabtitle";
ActorViewLogic.ignoredStats = ["Life","MP","MPRecharge","MPRechargeCount","","SpeedCount"];
ActorViewLogic.AttributeExplanation = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["Attack"] = "Influences inflicted damage";
	_g.h["Defense"] = "Decreases incoming damage";
	_g.h["Speed"] = "Frequency of attacks";
	_g.h["Blood"] = "Increases damage, but loses life with each attack";
	_g.h["Piercing"] = "Armor piercing power";
	_g.h["Life"] = "When it gets to 0, you need to recover";
	_g.h["LifeMax"] = "When it gets to 0, you need to recover";
	_g.h["MPMax"] = "Skills consume this. Expend it all to start recovering.";
	$r = _g;
	return $r;
}(this));
CurrencyViewLogic.currencyToSprite = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = Sprite.create("circle",11,11);
		_g.h["Lagrima"] = value;
	}
	{
		var value = Sprite.create("whitep",1,1);
		_g.h["Lagrima Stone"] = value;
	}
	$r = _g;
	return $r;
}(this));
GRIViewEquip.equipment_MaxInPage = 9999;
GRIViewEquip.equippedViewIdPart = "equippedbutton_";
GRIViewEquip.equipmentViewIdPart = "equipmentbutton_";
GRIViewEquip.layoutIdEquip = "equipbutton";
GRIViewEquip.layoutIdEquipHover = "equiphover";
GRIViewEquip.LAYOUT_EQUIP_BUTTON_MISC = "miscequipbuttons";
GRIViewEquip.TAG_EQUIPBUTTON_SPECIALWIDGET = "specialwidget";
GRIViewEquip.DATA_UPGRADE = "upgradebutton";
GRIViewEquip.DATA_SELL = "sellbutton";
GRIViewEquip.DATA_SELL_WORSE = "sellbutton_worse";
GRIViewEquip.DATA_EQUIP = "equipnmodebutton";
GRIViewRegion.LAYOUT_REGION_REGIONS = "region_regions";
GRIViewRegion.LAYOUT_REGION_AREAS = "region_areas";
GRIViewRegion.LAYOUT_REGION_MONSTER = "region_enemy";
GRIViewTitle.LAYOUT_BUTTON_TITLE = "titlebuttons";
GRIViewTitle.DATA_DISCORD = "discord";
GRIViewTitle.DATA_STEAM = "steam";
GRIViewTitle.DATA_START = "start";
GRIViewTitle.DATA_RESET = "reset";
GRIViewTitle.DATA_CONTINUE = "buttoncontinue";
GRIViewTitle.DATA_ROADMAP = "roadmap";
ImageManager.images = new haxe_ds_StringMap();
Mouse.mouse = new Mouse();
Keyboard.keyboard = new Keyboard();
PhaserRenderer.images = new haxe_ds_StringMap();
PhaserRenderer.z = 0;
PrototypeItemMaker.itemType_Weapon = 0;
PrototypeItemMaker.itemType_Armor = 1;
Renderer.aux = new Rect(0,0,0,0);
Renderer.aux2 = new Rect(0,0,0,0);
Renderer.aux3 = new Rect(0,0,0,0);
Renderer.aux4 = new Rect(0,0,0,0);
Vector2.elementCount = 2;
XTextRender.auxLines = [];
BitmapText.spaceCharCode = HxOverrides.cca(" ",0);
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.h["lt"] = "<";
	h.h["gt"] = ">";
	h.h["amp"] = "&";
	h.h["quot"] = "\"";
	h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
