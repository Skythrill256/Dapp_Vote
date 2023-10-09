// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

library Counters {
    using Counters for Counters.Counter;

    struct Counter {
        // Current value of the counter
        uint256 _value;
    }

    function current(Counters.Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counters.Counter storage counter) internal {
        counter._value++;
    }

    function decrement(Counters.Counter storage counter) internal {
        counter._value--;
    }
}