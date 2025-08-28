/**
 * 根据半径获取随机的球坐标系 -> 笛卡尔坐标系的转换
 * x=r*sinθ*cosφ
 * y=r*sinθ*sinφ
 * z=r*cosθ
 */
export function getRandomPolarCoordinate(r) {
    // 获取两个[0, 2Π]的随机角度，组成球面坐标(r, θ, φ)
    const theta = Math.random() * Math.PI * 2 // θ 天顶角（点与正z轴夹角）
    const phi = Math.random() * Math.PI * 2 // φ 方位角（点与正x轴夹角）

    // 坐标转换
    const x = r * Math.sin(theta) * Math.cos(phi)
    const y = r * Math.sign(theta) * Math.sign(phi)
    const z = r * Math.cos(theta)

    return {
        x,
        y,
        z
    }
}