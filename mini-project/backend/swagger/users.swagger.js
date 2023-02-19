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
 *                          og:
 *                              type: object
 *                              example:
 *                                      image: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
 *                                      title: "네이버"
 *                                      description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
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
