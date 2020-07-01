# Tiago Laya Demo

本demo为了能够简单阐述tiago的用法，采用IOS MVC 模式编写
<!-- #region -->
<img src="https://raw.githubusercontent.com/Draveness/analyze/master/contents/architecture/images/mvx/MVC-with-iOS.jpg">
<!-- #endregion -->

本demo主要展示为controller `/src/controller/` 中tiago以及tiago中的房间服务的使用。
model `/src/model/` 用来存储信息。
view `/src/view/` 用来存放游戏相关视图

## 关于tiago的书写

tiago 相关用法在 `/src/controller/tiago_controller.ts`。

### 多人匹配
调用`tiago.init`，之后使用`tiago.makeTeam`进行组队，匹配则会由tiago自身负责

### 单人匹配
兼容tiago一期的方法

调用`tiago.init`，之后使用`tiago.startSingleMatch`进行直接匹配
