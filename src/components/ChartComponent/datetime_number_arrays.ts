const datetimeArray: Date[] = [ new Date( 2023, 0, 1, 12, 0 ), new Date( 2023, 0, 1, 12, 15 ), new Date( 2023, 0, 1, 12, 30 ), new Date( 2023, 0, 1, 12, 45 ), new Date( 2023, 0, 1, 13, 0 ), new Date( 2023, 0, 1, 13, 15 ), new Date( 2023, 0, 1, 13, 30 ), new Date( 2023, 0, 1, 13, 45 ), new Date( 2023, 0, 1, 14, 0 ), new Date( 2023, 0, 1, 14, 15 ), new Date( 2023, 0, 1, 14, 30 ), new Date( 2023, 0, 1, 14, 45 ), new Date( 2023, 0, 1, 15, 0 ), new Date( 2023, 0, 1, 15, 15 ), new Date( 2023, 0, 1, 15, 30 ), new Date( 2023, 0, 1, 15, 45 ), new Date( 2023, 0, 1, 16, 0 ), new Date( 2023, 0, 1, 16, 15 ), new Date( 2023, 0, 1, 16, 30 ), new Date( 2023, 0, 1, 16, 45 ), new Date( 2023, 0, 1, 17, 0 ), new Date( 2023, 0, 1, 17, 15 ), new Date( 2023, 0, 1, 17, 30 ), new Date( 2023, 0, 1, 17, 45 ), new Date( 2023, 0, 1, 18, 0 ), new Date( 2023, 0, 1, 18, 15 ), new Date( 2023, 0, 1, 18, 30 ), new Date( 2023, 0, 1, 18, 45 ), new Date( 2023, 0, 1, 19, 0 ), new Date( 2023, 0, 1, 19, 15 ), new Date( 2023, 0, 1, 19, 30 ), new Date( 2023, 0, 1, 19, 45 ), new Date( 2023, 0, 1, 20, 0 ), new Date( 2023, 0, 1, 20, 15 ), new Date( 2023, 0, 1, 20, 30 ), new Date( 2023, 0, 1, 20, 45 ), new Date( 2023, 0, 1, 21, 0 ), new Date( 2023, 0, 1, 21, 15 ), new Date( 2023, 0, 1, 21, 30 ), new Date( 2023, 0, 1, 21, 45 ), new Date( 2023, 0, 1, 22, 0 ), new Date( 2023, 0, 1, 22, 15 ), new Date( 2023, 0, 1, 22, 30 ), new Date( 2023, 0, 1, 22, 45 ), new Date( 2023, 0, 1, 23, 0 ), new Date( 2023, 0, 1, 23, 15 ), new Date( 2023, 0, 1, 23, 30 ), new Date( 2023, 0, 1, 23, 45 ), new Date( 2023, 0, 2, 0, 0 ), new Date( 2023, 0, 2, 0, 15 ), new Date( 2023, 0, 2, 0, 30 ), new Date( 2023, 0, 2, 0, 45 ), new Date( 2023, 0, 2, 1, 0 ), new Date( 2023, 0, 2, 1, 15 ), new Date( 2023, 0, 2, 1, 30 ), new Date( 2023, 0, 2, 1, 45 ), new Date( 2023, 0, 2, 2, 0 ), new Date( 2023, 0, 2, 2, 15 ), new Date( 2023, 0, 2, 2, 30 ), new Date( 2023, 0, 2, 2, 45 ), new Date( 2023, 0, 2, 3, 0 ), new Date( 2023, 0, 2, 3, 15 ), new Date( 2023, 0, 2, 3, 30 ), new Date( 2023, 0, 2, 3, 45 ), new Date( 2023, 0, 2, 4, 0 ), new Date( 2023, 0, 2, 4, 15 ), new Date( 2023, 0, 2, 4, 30 ), new Date( 2023, 0, 2, 4, 45 ), new Date( 2023, 0, 2, 5, 0 ), new Date( 2023, 0, 2, 5, 15 ), new Date( 2023, 0, 2, 5, 30 ), new Date( 2023, 0, 2, 5, 45 ), new Date( 2023, 0, 2, 6, 0 ), new Date( 2023, 0, 2, 6, 15 ), new Date( 2023, 0, 2, 6, 30 ), new Date( 2023, 0, 2, 6, 45 ), new Date( 2023, 0, 2, 7, 0 ), new Date( 2023, 0, 2, 7, 15 ), new Date( 2023, 0, 2, 7, 30 ), new Date( 2023, 0, 2, 7, 45 ), new Date( 2023, 0, 2, 8, 0 ), new Date( 2023, 0, 2, 8, 15 ), new Date( 2023, 0, 2, 8, 30 ), new Date( 2023, 0, 2, 8, 45 ), new Date( 2023, 0, 2, 9, 0 ), new Date( 2023, 0, 2, 9, 15 ), new Date( 2023, 0, 2, 9, 30 ), new Date( 2023, 0, 2, 9, 45 ), new Date( 2023, 0, 2, 10, 0 ), new Date( 2023, 0, 2, 10, 15 ), new Date( 2023, 0, 2, 10, 30 ), new Date( 2023, 0, 2, 10, 45 ), new Date( 2023, 0, 2, 11, 0 ), new Date( 2023, 0, 2, 11, 15 ), new Date( 2023, 0, 2, 11, 30 ), new Date( 2023, 0, 2, 11, 45 ) ];

const numberArray: number[][] =
    [
        [ 1, 33, 52, 54, 93, 63, 27, 96, 47, 86, 36, 69, 50, 68, 54, 50, 54, 35, 59, 20, 42, 54, 85, 40, 5, 74, 37, 5, 47, 55, 4, 92, 4, 88, 67, 4, 91, 91, 7, 49, 26, 91, 51, 87, 92, 83, 64, 79, 47, 91, 38, 79, 28, 10, 21, 94, 31, 10, 41, 26, 48, 66, 36, 49, 28, 82, 29, 63, 62, 43, 59, 90, 88, 98, 93, 96, 43, 55, 79, 63, 50, 67, 12, 43, 41, 65, 61, 57, 33, 19, 61, 10, 64, 50, 25, 23 ],
        [ 6, 46, 67, 22, 31, 99, 42, 78, 37, 57, 46, 55, 74, 45, 88, 60, 36, 18, 59, 87, 91, 9, 39, 5, 12, 10, 75, 13, 21, 6, 21, 74, 43, 35, 75, 10, 44, 80, 12, 17, 71, 77, 28, 18, 55, 15, 93, 41, 79, 65, 19, 92, 4, 36, 84, 15, 51, 14, 59, 47, 48, 61, 48, 100, 9, 64, 61, 6, 41, 19, 69, 70, 45, 97, 75, 22, 15, 59, 41, 14, 86, 73, 83, 35, 27, 5, 23, 42, 99, 23, 63, 28, 9, 22, 57, 71 ],
        [ 9, 14, 6, 12, 85, 1, 17, 34, 62, 73, 31, 37, 92, 68, 33, 59, 27, 6, 37, 40, 22, 47, 62, 86, 26, 14, 52, 75, 37, 80, 97, 93, 69, 50, 47, 42, 85, 57, 58, 83, 41, 43, 72, 15, 25, 83, 59, 5, 52, 56, 56, 86, 70, 20, 52, 38, 83, 53, 96, 49, 23, 19, 22, 97, 4, 70, 92, 38, 40, 44, 55, 61, 78, 96, 38, 5, 25, 49, 97, 39, 64, 30, 5, 13, 12, 22, 68, 27, 39, 91, 68, 89, 22, 31, 100, 65 ],
        [ 97, 57, 40, 80, 38, 61, 88, 18, 65, 99, 26, 84, 88, 38, 94, 42, 24, 65, 21, 88, 34, 67, 78, 92, 15, 32, 20, 64, 28, 4, 14, 75, 10, 14, 49, 57, 38, 18, 25, 65, 53, 5, 29, 74, 57, 62, 2, 21, 99, 40, 52, 57, 91, 18, 76, 92, 5, 56, 34, 80, 68, 52, 97, 28, 44, 20, 21, 31, 4, 38, 2, 21, 54, 17, 69, 40, 6, 67, 14, 31, 13, 90, 83, 95, 17, 100, 53, 19, 49, 33, 97, 3, 17, 42, 79, 98 ],
        [ 73, 64, 99, 96, 29, 61, 26, 7, 71, 57, 98, 99, 76, 8, 91, 52, 48, 99, 94, 7, 17, 26, 40, 74, 100, 64, 51, 76, 3, 90, 67, 59, 56, 96, 18, 96, 38, 1, 71, 49, 94, 3, 62, 46, 55, 31, 82, 67, 74, 93, 8, 32, 10, 53, 53, 85, 58, 75, 94, 83, 4, 25, 96, 72, 24, 66, 90, 64, 8, 46, 98, 28, 58, 6, 97, 38, 3, 75, 76, 97, 71, 15, 22, 41, 71, 33, 73, 5, 69, 40, 32, 8, 78, 5, 38, 73 ],
        [ 7, 78, 88, 50, 75, 75, 10, 47, 74, 76, 40, 88, 73, 75, 20, 57, 14, 10, 80, 83, 80, 43, 22, 6, 66, 2, 13, 32, 12, 13, 65, 25, 44, 82, 29, 54, 79, 86, 62, 4, 48, 100, 35, 90, 26, 58, 31, 16, 1, 36, 28, 2, 16, 13, 96, 51, 89, 30, 71, 71, 100, 24, 56, 44, 82, 89, 99, 72, 42, 38, 88, 17, 27, 28, 85, 52, 85, 38, 96, 20, 57, 53, 1, 33, 49, 96, 76, 41, 33, 95, 13, 11, 6, 37, 6, 72 ],
    ]

export { datetimeArray, numberArray }
