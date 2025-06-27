[toc]

# ThreeJS

## 基础概念

- Scene：场景

    - Group：组

        - Mesh：网格模型

            - Geometry：几何体

            - Metial：材质
        
    - Light：灯光

        - AmbientLight：环境光，均匀的照亮场景的所有物体（所以也没有方向）

        - DirectionalLight：平行光，平行的光线，一般模拟非常远距离的光线照射，如太阳光

        - PointLight：点光源，从一个点出发发射的光源，比如灯泡

        - SpotLight：聚光灯，照射出一个圆锥体的光源，比如手电筒，舞台聚光灯

        - HemisphereLight：半球光，两种颜色的光，比如天空到地面两种颜色互相叠加

        - RectAreaLight：矩形光，矩形平面的光，类似从窗户或LED灯管等一个面发出光的效果

    - Camera：相机

        - FOV: 可视化锥体角度（从上到下的角度范围）

        - ASPECT: 可视化锥体的宽高比（根据角度FOV和宽高比，能够得到近端和远端的具体宽高大小）

        - NEAR: 近端（近端距离相机的距离）

        - FAR: 远端（远端距离相机的距离）

- Renderer：渲染器

## 可视化调试

使用 `Data-GUI` 进行可视化调试，便于合理的设置各项参数值

## Helper

- AxesHelper：坐标轴辅助对象

- GridHelper：网格辅助对象，可再XZ轴面上绘制网格，用来标识地面，方便进行物品位置设定辅助

- CameraHelper：相机辅助对象，可视化相机的远近点以及可视化锥体范围

- ArrowHelper：箭头辅助对象，可视化一个有方向的箭头，可以自定义进行箭头绘制用于标识方向

- PolarGridHelper：极坐标网格辅助对象，可视化一个极坐标平面
