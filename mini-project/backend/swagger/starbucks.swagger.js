/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 메뉴목록 가져오기
 *     tags: [starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 나이트로 바닐라 크림
 *                          img:
 *                              type: string
 *                              example: "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg"
 */
