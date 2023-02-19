/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 요청하기
 *     tags: [Tokens/phone]
 *     consumes:
 *          - application/json
 *     requestBody:
 *            name: user
 *            required: true
 *            description: 요청받은 전화번호
 *            content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: "01047802176"
 *
 *
 *     responses:
 *       200:
 *         description: 성공
 *       422:
 *         description: 실패
 *
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰 대조하기
 *     tags: [Tokens/phone]
 *     consumes:
 *          - application/json
 *     requestBody:
 *            name: user
 *            required: true
 *            description: 대조하려는 전화번호와 토큰
 *            content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: "01047802176"
 *                          token:
 *                              type: string
 *                              example: "482488"
 *     responses:
 *       200:
 *         description: 성공
 */
