## 使用Sprite + Canvas做标注

Sprite特性与CSS2DRenderer类似，都是2D物体，永远正对着相机，但Sprite无法嵌入DOM。

不过Sprite可以嵌入Canvas作为map，来实现CSS2DRenderer类似效果

- 还有则是Sprite绘制的标注会被其他模型遮挡，但CSS2DRenderer不会，CSS2DRenderer始终会处于视角内最上层