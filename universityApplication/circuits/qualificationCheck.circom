pragma circom 2.1.3;

include "circomlib/circuits/comparators.circom";

template qualificationCheck() {
    signal input studentMarks[4];
    signal input universityBenchmark[4];

    signal lowerBound[4];

    signal check;

    signal output out;

    component gte[4];

    component finalCheck;
    
    for (var i = 0; i < 4; i++) {
        gte[i] = GreaterEqThan(5);
        gte[i].in[0] <== studentMarks[i];
        gte[i].in[1] <== universityBenchmark[i];
        
        lowerBound[i] <== gte[i].out;
    }

    check <== lowerBound[0] + lowerBound[1] + lowerBound[2] + lowerBound[3];

    finalCheck = IsEqual();
    finalCheck.in[0] <== check;
    finalCheck.in[1] <== 4;

    out <== finalCheck.out;
}

component main = qualificationCheck();

/* INPUT = {
    "studentMarks" : [22,27,26,25],
    "universityBenchmark" : [20,20,20,20]
} */

