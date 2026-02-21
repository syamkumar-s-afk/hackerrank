export const questions = [
    {
        id: 'q1',
        title: 'FizzBuzz',
        description: `
You are given a number _n_.
- For every integer _i_ from 1 to _n_, print:
- **FizzBuzz** if _i_ is divisible by both 3 and 5
- **Fizz** if _i_ is divisible by 3 only
- **Buzz** if _i_ is divisible by 5 only
- Otherwise, print _i_

Print one result per line.

**Example**
Suppose _n_ = 15.
Output:
1
2
Fizz
4
Buzz
Fizz
7
8
    `,
        codeTemplate: `import java.io.*;
class Result {
    /*
     * Complete the 'fizzBuzz' function below.
     *
     * The function accepts INTEGER n as parameter.
     */
    public static void fizzBuzz(int n) {
        // Write your code here
    }
}
public class Solution {
    // Boilerplate main logic hidden
}`
    },
    {
        id: 'q2',
        title: 'Two Sum',
        description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    `,
        codeTemplate: `import java.io.*;
class Result {
    /*
     * Complete the 'twoSum' function below.
     */
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}
public class Solution {
    // Boilerplate main logic hidden
}`
    }
];
