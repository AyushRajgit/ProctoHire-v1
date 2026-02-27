export const PROBLEMS = {
    // ==========================
    // EASY PROBLEMS 
    // ==========================

    "two-sum": {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Array • Hash Table",
        description: {
            text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
            notes: [
                "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                "You can return the answer in any order.",
            ],
        },
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
            },
        ],
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
            "Only one valid answer exists",
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
            cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}`
        },
        expectedOutput: {
            javascript: "[0,1]\n[1,2]\n[0,1]",
            python: "[0, 1]\n[1, 2]\n[0, 1]",
            java: "[0, 1]\n[1, 2]\n[0, 1]",
            cpp: "[0,1]\n[1,2]\n[0,1]",
        },
    },

    "reverse-string": {
        id: "reverse-string",
        title: "Reverse String",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "Write a function that reverses a string. The input string is given as an array of characters s.",
            notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
        },
        examples: [
            {
                input: 's = ["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]',
            },
            {
                input: 's = ["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]',
            },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
        starterCode: {
            javascript: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nfunction reverseString(s) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def reverseString(self, s: List[str]) -> None:\n        """\n        Do not return anything, modify s in-place instead.\n        """\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};`,
            java: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`
        },
        expectedOutput: {
            javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
            python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
            java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
            cpp: "olleh\nHannah"
        },
    },

    "valid-palindrome": {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
            notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
        },
        examples: [
            {
                input: 's = "A man, a plan, a canal: Panama"',
                output: "true",
                explanation: '"amanaplanacanalpanama" is a palindrome.',
            },
            {
                input: 's = "race a car"',
                output: "false",
                explanation: '"raceacar" is not a palindrome.',
            },
            {
                input: 's = " "',
                output: "true",
                explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
            },
        ],
        constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
        starterCode: {
            javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n    \n}`,
            python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`
        },
        expectedOutput: {
            javascript: "true\nfalse\ntrue",
            python: "True\nFalse\nTrue",
            java: "true\nfalse\ntrue",
            cpp: "true\nfalse\ntrue"
        },
    },

    "palindrome-number": {
        id: "palindrome-number",
        title: "Palindrome Number",
        difficulty: "Easy",
        category: "Math",
        description: {
            text: "Given an integer x, return true if x is a palindrome, and false otherwise.",
            notes: ["An integer is a palindrome when it reads the same backward as forward.", "For example, 121 is a palindrome while 123 is not."],
        },
        examples: [{ input: "x = 121", output: "true" }, { input: "x = -121", output: "false" }],
        constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
        starterCode: {
            javascript: `/**\n * @param {number} x\n * @return {boolean}\n */\nfunction isPalindrome(x) {\n    \n}`,
            python: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass`,
            cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isPalindrome(int x) {\n        return false;\n    }\n}`
        },
        expectedOutput: { javascript: "true", python: "True", cpp: "true", java: "true" }
    },

    "climbing-stairs": {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        category: "Dynamic Programming",
        description: {
            text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            notes: [],
        },
        examples: [{ input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }],
        constraints: ["1 ≤ n ≤ 45"],
        starterCode: {
            javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n    \n}`,
            python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
            cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`
        },
        expectedOutput: { javascript: "3", python: "3", cpp: "3", java: "3" }
    },

    "fizz-buzz": {
        id: "fizz-buzz",
        title: "Fizz Buzz",
        difficulty: "Easy",
        category: "Simulation",
        description: {
            text: "Given an integer n, return a string array answer (1-indexed) where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, or the string of i.",
            notes: [],
        },
        examples: [{ input: "n = 3", output: '["1","2","Fizz"]' }],
        starterCode: {
            javascript: `/**\n * @param {number} n\n * @return {string[]}\n */\nfunction fizzBuzz(n) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def fizzBuzz(self, n: int) -> List[str]:\n        pass`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        return {};\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public List<String> fizzBuzz(int n) {\n        return new ArrayList<>();\n    }\n}`
        },
        expectedOutput: { javascript: '["1","2","Fizz"]', python: "['1', '2', 'Fizz']", cpp: "1 2 Fizz", java: "[1, 2, Fizz]" }
    },

    // ==========================
    // MEDIUM PROBLEMS 
    // ==========================

    "maximum-subarray": {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        category: "Array • Dynamic Programming",
        description: {
            text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
            notes: [],
        },
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
                explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
            },
            {
                input: "nums = [1]",
                output: "1",
                explanation: "The subarray [1] has the largest sum 1.",
            },
            {
                input: "nums = [5,4,-1,7,8]",
                output: "23",
                explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
            },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`
        },
        expectedOutput: {
            javascript: "6\n1\n23",
            python: "6\n1\n23",
            java: "6\n1\n23",
            cpp: "6\n1\n23"
        },
    },

    "longest-consecutive-sequence": {
        id: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        category: "Hash Set",
        description: { text: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.", notes: ["You must write an algorithm that runs in O(n) time."] },
        examples: [{ input: "nums = [100,4,200,1,3,2]", output: "4" }],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction longestConsecutive(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        return 0;\n    }\n}`
        },
        expectedOutput: { javascript: "4", python: "4", cpp: "4", java: "4" }
    },

    "rotate-image": {
        id: "rotate-image",
        title: "Rotate Image",
        difficulty: "Medium",
        category: "Matrix",
        description: { text: "Rotate an n x n 2D matrix 90 degrees clockwise in-place.", notes: ["Do not allocate another 2D matrix."] },
        examples: [{ input: "matrix = [[1,2],[3,4]]", output: "[[3,1],[4,2]]" }],
        starterCode: {
            javascript: `/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nfunction rotate(matrix) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        """\n        Do not return anything, modify matrix in-place instead.\n        """\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};`,
            java: `class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}`
        },
        expectedOutput: { javascript: "[[3,1],[4,2]]", python: "[[3, 1], [4, 2]]", cpp: "3 1 4 2", java: "[[3, 1], [4, 2]]" }
    },

    "house-robber": {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        category: "Dynamic Programming",
        description: { text: "Determine the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).", notes: [] },
        examples: [{ input: "nums = [1,2,3,1]", output: "4" }],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}`
        },
        expectedOutput: { javascript: "4", python: "4", cpp: "4", java: "4" }
    },

    "kth-largest-element": {
        id: "kth-largest-element",
        title: "Kth Largest Element",
        difficulty: "Medium",
        category: "Heap",
        description: { text: "Find the kth largest element in an unsorted array.", notes: ["Note that it is the kth largest element in sorted order, not the kth distinct element."] },
        examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nfunction findKthLargest(nums, k) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        return 0;\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int findKthLargest(int[] nums, int k) {\n        return 0;\n    }\n}`
        },
        expectedOutput: { javascript: "5", python: "5", cpp: "5", java: "5" }
    },

    "clone-graph": {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        category: "Graph • DFS",
        description: { text: "Given a reference of a node in a connected undirected graph, return a deep copy of the graph.", notes: [] },
        starterCode: {
            javascript: `/**\n * // Definition for a _Node.\n * function _Node(val, neighbors) {\n * this.val = val === undefined ? 0 : val;\n * this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\n\n/**\n * @param {_Node} node\n * @return {_Node}\n */\nfunction cloneGraph(node) {\n    \n}`,
            python: `from typing import Optional\n\n# Definition for a Node.\n# class Node:\n#     def __init__(self, val = 0, neighbors = None):\n#         self.val = val\n#         self.neighbors = neighbors if neighbors is not None else []\n\nclass Solution:\n    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:\n        pass`,
            cpp: `/*\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n    Node() {\n        val = 0;\n        neighbors = vector<Node*>();\n    }\n};\n*/\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        return nullptr;\n    }\n};`,
            java: `import java.util.*;\n/*\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node() {\n        val = 0;\n        neighbors = new ArrayList<Node>();\n    }\n}\n*/\nclass Solution {\n    public Node cloneGraph(Node node) {\n        return null;\n    }\n}`
        },
        expectedOutput: { javascript: "success", python: "success", cpp: "success", java: "success" }
    },

    "search-in-rotated-sorted-array": {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        description: { text: "Given a rotated sorted array and a target, return the index if found, else -1.", notes: ["Complexity must be O(log n)."] },
        examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`
        },
        expectedOutput: { javascript: "4", python: "4", cpp: "4", java: "4" }
    },

    "word-search": {
        id: "word-search",
        title: "Word Search",
        difficulty: "Medium",
        category: "Backtracking",
        description: { text: "Given an m x n grid and a word, return true if the word exists in the grid.", notes: ["The word can be constructed from letters of sequentially adjacent cells."] },
        examples: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" }],
        starterCode: {
            javascript: `/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        return false;\n    }\n}`
        },
        expectedOutput: { javascript: "true", python: "True", cpp: "true", java: "true" }
    },

    "container-with-most-water": {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Array • Two Pointers",
        description: {
            text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
            notes: [
                "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
                "Return the maximum amount of water a container can store.",
                "Notice that you may not slant the container.",
            ],
        },
        examples: [
            {
                input: "height = [1,8,6,2,5,4,8,3,7]",
                output: "49",
                explanation: "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
            },
            {
                input: "height = [1,1]",
                output: "1",
            },
        ],
        constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
        starterCode: {
            javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}`
        },
        expectedOutput: {
            javascript: "49\n1",
            python: "49\n1",
            java: "49\n1",
            cpp: "49\n1"
        },
    },

    // ==========================
    // HARD PROBLEMS 
    // ==========================

    "word-ladder-ii": {
        id: "word-ladder-ii",
        title: "Word Ladder II",
        difficulty: "Hard",
        category: "BFS • DFS",
        description: { text: "Find all shortest transformation sequences from beginWord to endWord.", notes: [] },
        starterCode: { 
            javascript: `/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {string[][]}\n */\nfunction findLadders(beginWord, endWord, wordList) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:\n        pass`, 
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {\n        return {};\n    }\n};`, 
            java: `import java.util.*;\n\nclass Solution {\n    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {\n        return new ArrayList<>();\n    }\n}` 
        },
        expectedOutput: { javascript: "[[...]]", python: "[[...]]", cpp: "[[...]]", java: "[[...]]" }
    },

    "burst-balloons": {
        id: "burst-balloons",
        title: "Burst Balloons",
        difficulty: "Hard",
        category: "Dynamic Programming",
        description: { text: "Find the maximum coins you can collect by bursting balloons wisely.", notes: [] },
        examples: [{ input: "nums = [3,1,5,8]", output: "167" }],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxCoins(nums) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def maxCoins(self, nums: List[int]) -> int:\n        pass`, 
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxCoins(vector<int>& nums) {\n        return 0;\n    }\n};`, 
            java: `class Solution {\n    public int maxCoins(int[] nums) {\n        return 0;\n    }\n}` 
        },
        expectedOutput: { javascript: "167", python: "167", cpp: "167", java: "167" }
    },

    "regular-expression-matching": {
        id: "regular-expression-matching",
        title: "Regular Expression Matching",
        difficulty: "Hard",
        category: "DP • Recursion",
        description: { text: "Implement regular expression matching with support for '.' and '*'.", notes: [] },
        examples: [{ input: 's = "aa", p = "a*"', output: "true" }],
        starterCode: { 
            javascript: `/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nfunction isMatch(s, p) {\n    \n}`, 
            python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass`, 
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isMatch(string s, string p) {\n        return false;\n    }\n};`, 
            java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        return false;\n    }\n}` 
        },
        expectedOutput: { javascript: "true", python: "True", cpp: "true", java: "true" }
    },

    "count-of-smaller-numbers": {
        id: "count-of-smaller-numbers",
        title: "Count of Smaller Numbers After Self",
        difficulty: "Hard",
        category: "Merge Sort • Binary Indexed Tree",
        description: { text: "Return an integer array where counts[i] is the number of smaller elements to the right of nums[i].", notes: [] },
        examples: [{ input: "nums = [5,2,6,1]", output: "[2,1,1,0]" }],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction countSmaller(nums) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def countSmaller(self, nums: List[int]) -> List[int]:\n        pass`, 
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countSmaller(vector<int>& nums) {\n        return {};\n    }\n};`, 
            java: `import java.util.*;\n\nclass Solution {\n    public List<Integer> countSmaller(int[] nums) {\n        return new ArrayList<>();\n    }\n}` 
        },
        expectedOutput: { javascript: "[2,1,1,0]", python: "[2, 1, 1, 0]", cpp: "2 1 1 0", java: "[2, 1, 1, 0]" }
    },

    "reverse-nodes-in-k-group": {
        id: "reverse-nodes-in-k-group",
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        category: "Linked List",
        description: { text: "Reverse the nodes of a linked list k at a time and return its modified list.", notes: [] },
        starterCode: { 
            javascript: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nfunction reverseKGroup(head, k) {\n    \n}`, 
            python: `from typing import Optional\n\n# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\nclass Solution:\n    def reverseKGroup(self, head: Optional['ListNode'], k: int) -> Optional['ListNode']:\n        pass`, 
            cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\nclass Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        return nullptr;\n    }\n};`, 
            java: `/*\npublic class ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n*/\nclass Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        return null;\n    }\n}` 
        },
        expectedOutput: { javascript: "success", python: "success", cpp: "success", java: "success" }
    },

    "largest-rectangle-in-histogram": {
        id: "largest-rectangle-in-histogram",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        category: "Stack",
        description: { text: "Given an array of integers representing the histogram's bar height where the width of each bar is 1, find the area of the largest rectangle in the histogram.", notes: [] },
        examples: [{ input: "heights = [2,1,5,6,2,3]", output: "10" }],
        starterCode: { 
            javascript: `/**\n * @param {number[]} heights\n * @return {number}\n */\nfunction largestRectangleArea(heights) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def largestRectangleArea(self, heights: List[int]) -> int:\n        pass`, 
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        return 0;\n    }\n};`, 
            java: `class Solution {\n    public int largestRectangleArea(int[] heights) {\n        return 0;\n    }\n}` 
        },
        expectedOutput: { javascript: "10", python: "10", cpp: "10", java: "10" }
    },

    "sudoku-solver": {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        difficulty: "Hard",
        category: "Backtracking",
        description: { text: "Write a program to solve a Sudoku puzzle by filling the empty cells.", notes: [] },
        starterCode: { 
            javascript: `/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nfunction solveSudoku(board) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def solveSudoku(self, board: List[List[str]]) -> None:\n        """\n        Do not return anything, modify board in-place instead.\n        """\n        pass`, 
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        \n    }\n};`, 
            java: `class Solution {\n    public void solveSudoku(char[][] board) {\n        \n    }\n}` 
        },
        expectedOutput: { javascript: "solved", python: "solved", cpp: "solved", java: "solved" }
    },

    "minimum-window-substring": {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        category: "Sliding Window",
        description: { text: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.", notes: [] },
        examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }],
        starterCode: { 
            javascript: `/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nfunction minWindow(s, t) {\n    \n}`, 
            python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass`, 
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        return "";\n    }\n};`, 
            java: `class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}` 
        },
        expectedOutput: { javascript: '"BANC"', python: '"BANC"', cpp: "BANC", java: "BANC" }
    },

    "first-missing-positive": {
        id: "first-missing-positive",
        title: "First Missing Positive",
        difficulty: "Hard",
        category: "Array • Cyclic Sort",
        description: { text: "Given an unsorted integer array nums, return the smallest missing positive integer.", notes: ["Algorithm must run in O(n) time and O(1) space."] },
        examples: [{ input: "nums = [1,2,0]", output: "3" }],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction firstMissingPositive(nums) {\n    \n}`, 
            python: `from typing import List\n\nclass Solution:\n    def firstMissingPositive(self, nums: List[int]) -> int:\n        pass`, 
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        return 1;\n    }\n};`, 
            java: `class Solution {\n    public int firstMissingPositive(int[] nums) {\n        return 1;\n    }\n}` 
        },
        expectedOutput: { javascript: "3", python: "3", cpp: "3", java: "3" }
    },
};

