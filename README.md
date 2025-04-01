[toc]

# ThreeJS

## 基础概念

- Scene：场景

    - Group：组

        - Mesh：网格模型

            - Geometry：几何体

            - Metial：材质
        
    - Light：灯光

    - Camera：相机

        - FOV: 可视化锥体角度（从上到下的角度范围）

        - ASPECT: 可视化锥体的宽高比（根据角度FOV和宽高比，能够得到近端和远端的具体宽高大小）

        - NEAR: 近端（近端距离相机的距离）

        - FAR: 远端（远端距离相机的距离）

- Renderer：渲染器

## 可视化调试

使用 `Data-GUI` 进行可视化调试，便于合理的设置各项参数值
