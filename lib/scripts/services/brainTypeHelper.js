
var THRESHOLDS = [20, 10, -10, -20];
var BRAINTYPES = ['Extreme Male', 'Male', 'Balanced', 'Female', 'Extreme Female'];

/*
 * Scale numbers for display
 */

module.exports.EQ_MIN = 0;
module.exports.EQ_MAX = 44;
module.exports.SQ_MIN = 0;
module.exports.SQ_MAX = 50;

scaleEmpathizing = scaleto100(module.exports.EQ_MIN, module.exports.EQ_MAX);
scaleSystemizing = scaleto100(module.exports.SQ_MIN, module.exports.SQ_MAX);
module.exports.getScaledValue = function (v, dimension) {
  return dimension === 'Empathizing' ? scaleEmpathizing(v) : scaleSystemizing(v);
}

function scaleto100(min, max) {
  return function (v) {
    return (v - min) / (max - min) * 100;  
  }
}

/*
 * Create function for region boundry
 */

module.exports.makeThresholdLineFunctions = function () {
  return THRESHOLDS.map(function (threshold) {
    return {
      fS: make_fS(threshold),
      fE: make_fE(threshold)
    };
  });
}

module.exports.makeThresholdAreaFunctions = function () {
  var lines = module.exports.makeThresholdLineFunctions();
  return BRAINTYPES.map(function (type, idx) {
    return {
      type: type,
      upper: lines[idx - 1],
      lower: lines[idx]
    }
  });
}

function make_fS(T) {
  // make f(S) = E
  // given SQ return EQ
  return function (S) {
    var E = ((S * 10 / 10.05) - T + (23.8 * 10 / 8.75) - (19 * 10 / 10.05)) / 10 * 8.75;
    return E;
  }
}

function make_fE(T) {
  // make f(E) = S
  // given EQ return SQ
  return function (E) {
    var S = (T + (E * 10 / 8.75) - (23.8 * 10 / 8.75) + (19 * 10 / 10.05)) * 10.05 / 10;
    return S;
  }
}

/*
 * Compute brain type
 */

module.exports.getBrainType = function (S, E) {
  var d = getDeviation(S, E);
  var i = THRESHOLDS.length - 1;
  var b = BRAINTYPES[THRESHOLDS.length];
  while (d > THRESHOLDS[i] && i >= 0) {
    b = BRAINTYPES[i];
    i -= 1;
  }
  return b;
}

function getDeviation(S, E) {
  // given SQ and EQ return D
  return (S * 10 / 10.05) - (E * 10 / 8.75) + (23.8 * 10 / 8.75) - (19 * 10 / 10.05);  
}



// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// Testing

function eqNum(n) {
  return String("      " + n).slice(-6);
}

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};

function test(E, S) {
  var b = module.exports.getBrainType(S, E);
  console.log('EQ:%s\tSQ:%s\tD:%s\t%s', 
    E, 
    S, 
    eqNum(getDeviation(S, E).toFixed(2)), 
    b.paddingLeft('              ')
  );  
}

// PROVING
console.info('Validating braintype');
test(12, 26);
test(32, 24);
test(6, 13);
test(16, 12);
test(32, 12);
test(32, 0);


/*
 * Notes
 */

// z(SQ) = (SQ - 19) / 10.05   z(EQ) = (EQ - 23.8) / 8.75

// T(SQ) = (z(SQ) * 10) + 50   T(EQ) = (z(EQ) * 10) + 50

// D = T(SQ) - T(EQ)
// D = ((z(SQ) * 10) + 50) - ((z(EQ) * 10) + 50);
// D = ((((SQ - 19) / 10.05) * 10) + 50) - ((((EQ - 23.8) / 8.75) * 10) + 50);

// can i reduce it ? ?
// T(SQ) = D + T(EQ);
// T(EQ) = T(SQ) - D;

// (((SQ - 19) / 10.05) * 10) + 50 = D + (((EQ - 23.8) / 8.75) * 10) + 50
//                            - 50                                   - 50

// ((SQ - 19) / 10.05) * 10 = D + (((EQ - 23.8) / 8.75) * 10)

// ((SQ - 19) * (10 / 10.05)) = D + ((EQ - 23.8) * (10 / 8.75))

// (S * 10 / 10.05)) - (19 * 10 / 10.05) = D + (E * 10 / 8.75) - (23.8 * 10 / 8.75))

// (S * 10 / 10.05)) = D + (E * 10 / 8.75) - (23.8 * 10 / 8.75)) + (19 * 10 / 10.05)

// E in terms of S
// E = ((S * 10 / 10.05)) - D + (23.8 * 10 / 8.75)) - (19 * 10 / 10.05)) / 10 * 8.75;

// S in terms of E
// S = (D + (E * 10 / 8.75) - (23.8 * 10 / 8.75)) + (19 * 10 / 10.05)) * 10.05 / 10;

// // for dots
// D = (S * 10 / 10.05) - (E * 10 / 8.75) + (23.8 * 10 / 8.75)) - (19 * 10 / 10.05);
