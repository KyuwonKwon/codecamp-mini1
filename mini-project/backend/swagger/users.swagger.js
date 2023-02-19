// users.swagger.js

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원목록 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          number:
 *                              type: int
 *                              example: 3
 *                          writer:
 *                              type: string
 *                              example: 철수
 *                          title:
 *                              type: string
 *                              example: 제목입니다~~~
 *                          contents:
 *                              type: string
 *                              example: 내용입니다!!!
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원 등록하기
 *     tags: [Users]
 *     consumes:
 *          - application/json
 *     requestBody:
 *            name: user
 *            required: true
 *            description: 생성할 유저
 *            content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 규원
 *                          email:
 *                              type: string
 *                              example: kkwon920@gmail.com
 *                          personal:
 *                              type: string
 *                              example: 212121-1111111
 *                          prefer:
 *                              type: string
 *                              example: http://www.naver.com
 *                          pwd:
 *                              type: string
 *                              example: 1234
 *                          phone:
 *                              type: string
 *                              example: "01047802176"
 *
 *     responses:
 *       200:
 *         description: 성공
 *       422:
 *         description: 실패
 *
 */
