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
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            { input: "nums = [3,3], target = 6", output: "[0,1]" },
        ],
        testCases: [
            { input: "nums = [2,7,11,15]\ntarget = 9", output: "[0,1]" },
            { input: "nums = [3,2,4]\ntarget = 6", output: "[1,2]" },
            { input: "nums = [3,3]\ntarget = 6", output: "[0,1]" },
            { input: "nums = [1,5,9]\ntarget = 10", output: "[0,2]" },
            { input: "nums = [-1,-2,-3,-4,-5]\ntarget = -8", output: "[2,4]" },
            { input: "nums = [0,4,3,0]\ntarget = 0", output: "[0,3]" },
            { input: "nums = [100,200,300,400]\ntarget = 700", output: "[2,3]" },
            { input: "nums = [5,75,25]\ntarget = 100", output: "[1,2]" }
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
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
        ],
        testCases: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
            { input: 's = ["a"]', output: '["a"]' },
            { input: 's = ["a","b"]', output: '["b","a"]' },
            { input: 's = ["1","2","3","4"]', output: '["4","3","2","1"]' },
            { input: 's = [" "]', output: '[" "]' },
            { input: 's = ["!","@","#"]', output: '["#","@","!"]' },
            { input: 's = ["A"," ","B"]', output: '["B"," ","A"]' }
        ],
        constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
        starterCode: {
            javascript: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nfunction reverseString(s) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def reverseString(self, s: List[str]) -> None:\n        """\n        Do not return anything, modify s in-place instead.\n        """\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};`,
            java: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`
        }
    },

    "valid-palindrome": {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
            notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
        },
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
            { input: 's = "race a car"', output: "false" },
            { input: 's = " "', output: "true" },
        ],
        testCases: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
            { input: 's = "race a car"', output: "false" },
            { input: 's = " "', output: "true" },
            { input: 's = "a"', output: "true" },
            { input: 's = "ab"', output: "false" },
            { input: 's = "0P"', output: "false" },
            { input: 's = "1b1"', output: "true" },
            { input: 's = "No \'x\' in Nixon"', output: "true" }
        ],
        constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
        starterCode: {
            javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n    \n}`,
            python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`
        }
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
        examples: [{ input: "x = 121", output: "true" }, { input: "x = -121", output: "false" }, { input: "x = 10", output: "false" }],
        testCases: [
            { input: "x = 121", output: "true" },
            { input: "x = -121", output: "false" },
            { input: "x = 10", output: "false" },
            { input: "x = 0", output: "true" },
            { input: "x = 11", output: "true" },
            { input: "x = 12321", output: "true" },
            { input: "x = 12345", output: "false" },
            { input: "x = 9999", output: "true" }
        ],
        constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
        starterCode: {
            javascript: `/**\n * @param {number} x\n * @return {boolean}\n */\nfunction isPalindrome(x) {\n    \n}`,
            python: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass`,
            cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isPalindrome(int x) {\n        return false;\n    }\n}`
        }
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
        testCases: [
            { input: "n = 1", output: "1" },
            { input: "n = 2", output: "2" },
            { input: "n = 3", output: "3" },
            { input: "n = 4", output: "5" },
            { input: "n = 5", output: "8" },
            { input: "n = 6", output: "13" },
            { input: "n = 10", output: "89" },
            { input: "n = 45", output: "1836311903" }
        ],
        constraints: ["1 ≤ n ≤ 45"],
        starterCode: {
            javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n    \n}`,
            python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
            cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`
        }
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
        testCases: [
            { input: "n = 1", output: '["1"]' },
            { input: "n = 3", output: '["1","2","Fizz"]' },
            { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
            { input: "n = 2", output: '["1","2"]' },
            { input: "n = 4", output: '["1","2","Fizz","4"]' },
            { input: "n = 6", output: '["1","2","Fizz","4","Buzz","Fizz"]' },
            { input: "n = 10", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz"]' },
            { input: "n = 15", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
        ],
        starterCode: {
            javascript: `/**\n * @param {number} n\n * @return {string[]}\n */\nfunction fizzBuzz(n) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def fizzBuzz(self, n: int) -> List[str]:\n        pass`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        return {};\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public List<String> fizzBuzz(int n) {\n        return new ArrayList<>();\n    }\n}`
        }
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
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
            { input: "nums = [1]", output: "1" },
            { input: "nums = [5,4,-1,7,8]", output: "23" },
        ],
        testCases: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
            { input: "nums = [1]", output: "1" },
            { input: "nums = [5,4,-1,7,8]", output: "23" },
            { input: "nums = [-1]", output: "-1" },
            { input: "nums = [-2,-1]", output: "-1" },
            { input: "nums = [0]", output: "0" },
            { input: "nums = [-10,2,3,-2,0,5,-15]", output: "8" },
            { input: "nums = [1,2,3,4,5]", output: "15" }
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`
        }
    },

    "longest-consecutive-sequence": {
        id: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        category: "Hash Set",
        description: { text: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.", notes: ["You must write an algorithm that runs in O(n) time."] },
        examples: [{ input: "nums = [100,4,200,1,3,2]", output: "4" }],
        testCases: [
            { input: "nums = [100,4,200,1,3,2]", output: "4" },
            { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
            { input: "nums = []", output: "0" },
            { input: "nums = [1]", output: "1" },
            { input: "nums = [1,2,0,1]", output: "3" },
            { input: "nums = [9,1,4,7,3,-1,0,5,8,-1,6]", output: "7" },
            { input: "nums = [10,20,30]", output: "1" },
            { input: "nums = [-5,-4,-3]", output: "3" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction longestConsecutive(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        return 0;\n    }\n}`
        }
    },

    "rotate-image": {
        id: "rotate-image",
        title: "Rotate Image",
        difficulty: "Medium",
        category: "Matrix",
        description: { text: "Rotate an n x n 2D matrix 90 degrees clockwise in-place.", notes: ["Do not allocate another 2D matrix."] },
        examples: [{ input: "matrix = [[1,2],[3,4]]", output: "[[3,1],[4,2]]" }],
        testCases: [
            { input: "matrix = [[1,2],[3,4]]", output: "[[3,1],[4,2]]" },
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
            { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" },
            { input: "matrix = [[1]]", output: "[[1]]" },
            { input: "matrix = [[1,1],[1,1]]", output: "[[1,1],[1,1]]" },
            { input: "matrix = [[0,0],[0,0]]", output: "[[0,0],[0,0]]" },
            { input: "matrix = [[1,0],[0,1]]", output: "[[0,1],[1,0]]" },
            { input: "matrix = [[-1,-2],[-3,-4]]", output: "[[-3,-1],[-4,-2]]" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nfunction rotate(matrix) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        """\n        Do not return anything, modify matrix in-place instead.\n        """\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};`,
            java: `class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}`
        }
    },

    "house-robber": {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        category: "Dynamic Programming",
        description: { text: "Determine the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).", notes: [] },
        examples: [{ input: "nums = [1,2,3,1]", output: "4" }],
        testCases: [
            { input: "nums = [1,2,3,1]", output: "4" },
            { input: "nums = [2,7,9,3,1]", output: "12" },
            { input: "nums = [0]", output: "0" },
            { input: "nums = [1]", output: "1" },
            { input: "nums = [2,1]", output: "2" },
            { input: "nums = [2,1,1,2]", output: "4" },
            { input: "nums = [100,1,1,100]", output: "200" },
            { input: "nums = [5,1,2,10,6,2]", output: "17" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}`
        }
    },

    "kth-largest-element": {
        id: "kth-largest-element",
        title: "Kth Largest Element",
        difficulty: "Medium",
        category: "Heap",
        description: { text: "Find the kth largest element in an unsorted array.", notes: ["Note that it is the kth largest element in sorted order, not the kth distinct element."] },
        examples: [{ input: "nums = [3,2,1,5,6,4]\nk = 2", output: "5" }],
        testCases: [
            { input: "nums = [3,2,1,5,6,4]\nk = 2", output: "5" },
            { input: "nums = [3,2,3,1,2,4,5,5,6]\nk = 4", output: "4" },
            { input: "nums = [1]\nk = 1", output: "1" },
            { input: "nums = [-1,-1]\nk = 2", output: "-1" },
            { input: "nums = [10,9,8,7]\nk = 1", output: "10" },
            { input: "nums = [10,9,8,7]\nk = 4", output: "7" },
            { input: "nums = [1,2,3,4,5,6,7,8,9,10]\nk = 5", output: "6" },
            { input: "nums = [3,3,3,3,3]\nk = 1", output: "3" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nfunction findKthLargest(nums, k) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        return 0;\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int findKthLargest(int[] nums, int k) {\n        return 0;\n    }\n}`
        }
    },

    "clone-graph": {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        category: "Graph • DFS",
        description: { text: "Given a reference of a node in a connected undirected graph, return a deep copy of the graph.", notes: [] },
        testCases: [
            { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
            { input: "adjList = [[]]", output: "[[]]" },
            { input: "adjList = []", output: "[]" },
            { input: "adjList = [[2],[1]]", output: "[[2],[1]]" },
            { input: "adjList = [[2,3],[1,3],[1,2]]", output: "[[2,3],[1,3],[1,2]]" },
            { input: "adjList = [[2],[1,3],[2]]", output: "[[2],[1,3],[2]]" },
            { input: "adjList = [[2,3,4],[1,3,4],[1,2,4],[1,2,3]]", output: "[[2,3,4],[1,3,4],[1,2,4],[1,2,3]]" },
            { input: "adjList = [[2],[1,3],[2,4],[3]]", output: "[[2],[1,3],[2,4],[3]]" }
        ],
        starterCode: {
            javascript: `/**\n * @param {_Node} node\n * @return {_Node}\n */\nfunction cloneGraph(node) {\n    \n}`,
            python: `from typing import Optional\nclass Solution:\n    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        return nullptr;\n    }\n};`,
            java: `class Solution {\n    public Node cloneGraph(Node node) {\n        return null;\n    }\n}`
        }
    },

    "search-in-rotated-sorted-array": {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        description: { text: "Given a rotated sorted array and a target, return the index if found, else -1.", notes: ["Complexity must be O(log n)."] },
        examples: [{ input: "nums = [4,5,6,7,0,1,2]\ntarget = 0", output: "4" }],
        testCases: [
            { input: "nums = [4,5,6,7,0,1,2]\ntarget = 0", output: "4" },
            { input: "nums = [4,5,6,7,0,1,2]\ntarget = 3", output: "-1" },
            { input: "nums = [1]\ntarget = 0", output: "-1" },
            { input: "nums = [1]\ntarget = 1", output: "0" },
            { input: "nums = [3,1]\ntarget = 1", output: "1" },
            { input: "nums = [3,1]\ntarget = 3", output: "0" },
            { input: "nums = [5,1,3]\ntarget = 5", output: "0" },
            { input: "nums = [5,1,3]\ntarget = 1", output: "1" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`
        }
    },

    "word-search": {
        id: "word-search",
        title: "Word Search",
        difficulty: "Medium",
        category: "Backtracking",
        description: { text: "Given an m x n grid and a word, return true if the word exists in the grid.", notes: ["The word can be constructed from letters of sequentially adjacent cells."] },
        examples: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nword = "ABCCED"', output: "true" }],
        testCases: [
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nword = "ABCCED"', output: "true" },
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nword = "SEE"', output: "true" },
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nword = "ABCB"', output: "false" },
            { input: 'board = [["a"]]\nword = "a"', output: "true" },
            { input: 'board = [["a"]]\nword = "b"', output: "false" },
            { input: 'board = [["a","a"]]\nword = "aaa"', output: "false" },
            { input: 'board = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]]\nword = "ABCESEEEFS"', output: "true" },
            { input: 'board = [["C","A","A"],["A","A","A"],["B","C","D"]]\nword = "AAB"', output: "true" }
        ],
        starterCode: {
            javascript: `/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        return false;\n    }\n}`
        }
    },

    "container-with-most-water": {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Array • Two Pointers",
        description: { text: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.", notes: [] },
        examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }],
        testCases: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
            { input: "height = [1,1]", output: "1" },
            { input: "height = [4,3,2,1,4]", output: "16" },
            { input: "height = [1,2,1]", output: "2" },
            { input: "height = [9,6,14,11,2,2,4,9,3,8]", output: "72" },
            { input: "height = [0,2]", output: "0" },
            { input: "height = [10,9,8,7,6,5,4,3,2,1]", output: "25" },
            { input: "height = [1,1000,1000,6,2,5,4,8,3,7]", output: "1000" }
        ],
        starterCode: {
            javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n    \n}`,
            python: `from typing import List\n\nclass Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}`
        }
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
        testCases: [
            { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log","cog"]', output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]' },
            { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log"]', output: "[]" },
            { input: 'beginWord = "a"\nendWord = "c"\nwordList = ["a","b","c"]', output: '[["a","c"]]' },
            { input: 'beginWord = "hot"\nendWord = "dog"\nwordList = ["hot","dog","dot"]', output: '[["hot","dot","dog"]]' },
            { input: 'beginWord = "hot"\nendWord = "dog"\nwordList = ["hot","dog"]', output: "[]" },
            { input: 'beginWord = "a"\nendWord = "c"\nwordList = ["a","b","c","d"]', output: '[["a","c"]]' },
            { input: 'beginWord = "ted"\nendWord = "tex"\nwordList = ["ted","tex","red","tax","tad","den","rex","pee"]', output: '[["ted","tex"]]' },
            { input: 'beginWord = "red"\nendWord = "tax"\nwordList = ["ted","tex","red","tax","tad","den","rex","pee"]', output: '[["red","ted","tad","tax"],["red","ted","tex","tax"],["red","rex","tex","tax"]]' }
        ],
        starterCode: { 
            javascript: `/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {string[][]}\n */\nfunction findLadders(beginWord, endWord, wordList) {\n    \n}`, 
            python: `from typing import List\nclass Solution:\n    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:\n        pass` 
        }
    },

    "burst-balloons": {
        id: "burst-balloons",
        title: "Burst Balloons",
        difficulty: "Hard",
        category: "Dynamic Programming",
        description: { text: "Find the maximum coins you can collect by bursting balloons wisely.", notes: [] },
        examples: [{ input: "nums = [3,1,5,8]", output: "167" }],
        testCases: [
            { input: "nums = [3,1,5,8]", output: "167" },
            { input: "nums = [1,5]", output: "10" },
            { input: "nums = [8]", output: "8" },
            { input: "nums = [9,76,64,21]", output: "116718" },
            { input: "nums = [2,3,2]", output: "16" },
            { input: "nums = [1,1,1,1]", output: "4" },
            { input: "nums = [3,2,5]", output: "45" },
            { input: "nums = [4,2,3,7]", output: "124" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxCoins(nums) {\n    \n}`, 
            python: `from typing import List\nclass Solution:\n    def maxCoins(self, nums: List[int]) -> int:\n        pass` 
        }
    },

    "regular-expression-matching": {
        id: "regular-expression-matching",
        title: "Regular Expression Matching",
        difficulty: "Hard",
        category: "DP • Recursion",
        description: { text: "Implement regular expression matching with support for '.' and '*'.", notes: [] },
        examples: [{ input: 's = "aa", p = "a*"', output: "true" }],
        testCases: [
            { input: 's = "aa"\np = "a"', output: "false" },
            { input: 's = "aa"\np = "a*"', output: "true" },
            { input: 's = "ab"\np = ".*"', output: "true" },
            { input: 's = "aab"\np = "c*a*b"', output: "true" },
            { input: 's = "mississippi"\np = "mis*is*p*."', output: "false" },
            { input: 's = "aaa"\np = "a*a"', output: "true" },
            { input: 's = "aaa"\np = "ab*a*c*a"', output: "true" },
            { input: 's = "a"\np = ".*..a*"', output: "false" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nfunction isMatch(s, p) {\n    \n}`, 
            python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass` 
        }
    },

    "count-of-smaller-numbers": {
        id: "count-of-smaller-numbers",
        title: "Count of Smaller Numbers After Self",
        difficulty: "Hard",
        category: "Merge Sort • Binary Indexed Tree",
        description: { text: "Return an integer array where counts[i] is the number of smaller elements to the right of nums[i].", notes: [] },
        examples: [{ input: "nums = [5,2,6,1]", output: "[2,1,1,0]" }],
        testCases: [
            { input: "nums = [5,2,6,1]", output: "[2,1,1,0]" },
            { input: "nums = [-1]", output: "[0]" },
            { input: "nums = [-1,-1]", output: "[0,0]" },
            { input: "nums = [1,2,0]", output: "[1,1,0]" },
            { input: "nums = [2,0,1]", output: "[2,0,0]" },
            { input: "nums = [5,4,3,2,1]", output: "[4,3,2,1,0]" },
            { input: "nums = [1,2,3,4,5]", output: "[0,0,0,0,0]" },
            { input: "nums = [2,2,2,2]", output: "[0,0,0,0]" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction countSmaller(nums) {\n    \n}`, 
            python: `from typing import List\nclass Solution:\n    def countSmaller(self, nums: List[int]) -> List[int]:\n        pass` 
        }
    },

    "reverse-nodes-in-k-group": {
        id: "reverse-nodes-in-k-group",
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        category: "Linked List",
        description: { text: "Reverse the nodes of a linked list k at a time and return its modified list.", notes: [] },
        testCases: [
            { input: "head = [1,2,3,4,5]\nk = 2", output: "[2,1,4,3,5]" },
            { input: "head = [1,2,3,4,5]\nk = 3", output: "[3,2,1,4,5]" },
            { input: "head = [1,2,3,4,5]\nk = 1", output: "[1,2,3,4,5]" },
            { input: "head = [1]\nk = 1", output: "[1]" },
            { input: "head = [1,2]\nk = 2", output: "[2,1]" },
            { input: "head = [1,2,3]\nk = 3", output: "[3,2,1]" },
            { input: "head = [1,2,3,4]\nk = 2", output: "[2,1,4,3]" },
            { input: "head = [1,2,3,4,5,6]\nk = 3", output: "[3,2,1,6,5,4]" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nfunction reverseKGroup(head, k) {\n    \n}`
        }
    },

    "largest-rectangle-in-histogram": {
        id: "largest-rectangle-in-histogram",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        category: "Stack",
        description: { text: "Find the area of the largest rectangle in the histogram.", notes: [] },
        examples: [{ input: "heights = [2,1,5,6,2,3]", output: "10" }],
        testCases: [
            { input: "heights = [2,1,5,6,2,3]", output: "10" },
            { input: "heights = [2,4]", output: "4" },
            { input: "heights = [2,1,2]", output: "3" },
            { input: "heights = [1,1,1,1]", output: "4" },
            { input: "heights = [5,4,3,2,1]", output: "9" },
            { input: "heights = [1,2,3,4,5]", output: "9" },
            { input: "heights = [0,9]", output: "9" },
            { input: "heights = [2,1,5,6,2,3,2,2]", output: "12" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {number[]} heights\n * @return {number}\n */\nfunction largestRectangleArea(heights) {\n    \n}`
        }
    },

    "sudoku-solver": {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        difficulty: "Hard",
        category: "Backtracking",
        description: { text: "Write a program to solve a Sudoku puzzle by filling the empty cells.", notes: [] },
        testCases: [
            { input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: "solved" },
            { input: 'board = [[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]', output: "solved" },
            { input: 'board = [["1",".",".",".",".",".",".",".","2"],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],["3",".",".",".",".",".",".",".","4"]]', output: "solved" },
            { input: 'board = [["8","2","7","1","5","4","3","9","6"],["9","6","5","3","2","7","1","4","8"],["3","4","1","6","8","9","7","5","2"],["5","9","3","4","6","8","2","7","1"],["4","7","2","5","1","3","6","8","9"],["6","1","8","9","7","2","4","3","5"],["7","8","6","2","3","5","9","1","4"],["1","5","4","7","9","6","8","2","3"],["2","3","9","8","4","1","5","6","7"]]', output: "solved" },
            { input: 'board = [[".","2",".","1",".","4",".","9","."],["9",".","5",".","2",".","1",".","8"],[".","4",".","6",".","9",".","5","."],["5",".","3",".","6",".","2",".","1"],[".","7",".","5",".","3",".","8","."],["6",".","8",".","7",".","4",".","5"],[".","8",".","2",".","5",".","1","."],["1",".","4",".","9",".","8",".","3"],[".","3",".","8",".","1",".","6","."]]', output: "solved" },
            { input: 'board = [["9",".",".",".","7",".",".",".","."],["2",".",".",".",".",".","4",".","."],[".","4",".",".","8",".",".",".","."],[".",".",".","1",".",".",".","5","."],[".",".","3",".",".",".","7",".","."],[".","6",".",".",".","2",".",".","."],[".",".",".",".","5",".",".","2","."],[".",".","8",".",".",".",".",".","3"],["1",".",".",".",".",".",".",".","9"]]', output: "solved" },
            { input: 'board = [[".","8",".",".",".","9","7","4","3"],[".","5",".",".",".","8",".","1","."],[".","1",".",".",".",".",".",".","."],["8",".",".",".",".","5",".",".","."],[".",".",".","8",".","4",".",".","."],[".",".",".","3",".",".",".",".","6"],[".",".",".",".",".",".",".","7","."],[".","3",".","5",".",".",".","8","."],["9","7","2","4",".",".",".","5","."]]', output: "solved" },
            { input: 'board = [["2",".",".","9",".",".",".",".","."],[".",".",".",".",".",".",".","6","."],[".",".",".",".",".","1",".",".","."],[".",".","8",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".","4",".",".",".","."],[".",".",".",".",".",".","2",".","."],[".","7",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","3"]]', output: "solved" }
        ],
        starterCode: { javascript: `/**\n * @param {character[][]} board\n * @return {void}\n */\nfunction solveSudoku(board) {\n    \n}` }
    },

    "minimum-window-substring": {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        category: "Sliding Window",
        description: { text: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.", notes: [] },
        testCases: [
            { input: 's = "ADOBECODEBANC"\nt = "ABC"', output: '"BANC"' },
            { input: 's = "a"\nt = "a"', output: '"a"' },
            { input: 's = "a"\nt = "aa"', output: '""' },
            { input: 's = "ab"\nt = "a"', output: '"a"' },
            { input: 's = "ab"\nt = "b"', output: '"b"' },
            { input: 's = "bba"\nt = "ab"', output: '"ba"' },
            { input: 's = "A"\nt = "B"', output: '""' },
            { input: 's = "aaaaaaaaaaaabbbbbcdd"\nt = "abcdd"', output: '"abbbbbcdd"' }
        ],
        starterCode: { 
            javascript: `/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nfunction minWindow(s, t) {\n    \n}`
        }
    },

    "first-missing-positive": {
        id: "first-missing-positive",
        title: "First Missing Positive",
        difficulty: "Hard",
        category: "Array • Cyclic Sort",
        description: { text: "Given an unsorted integer array nums, return the smallest missing positive integer.", notes: ["Algorithm must run in O(n) time and O(1) space."] },
        testCases: [
            { input: "nums = [1,2,0]", output: "3" },
            { input: "nums = [3,4,-1,1]", output: "2" },
            { input: "nums = [7,8,9,11,12]", output: "1" },
            { input: "nums = [1]", output: "2" },
            { input: "nums = [2]", output: "1" },
            { input: "nums = [1,2,3]", output: "4" },
            { input: "nums = [-1,-2,-3]", output: "1" },
            { input: "nums = [0,2,2,1,1]", output: "3" }
        ],
        starterCode: { 
            javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction firstMissingPositive(nums) {\n    \n}`
        }
    }
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};