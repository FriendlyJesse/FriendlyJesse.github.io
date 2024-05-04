# Rreact native
## UI component
### Text
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704265483328-e059a4ad-7a6a-44a5-be74-eb0fc8e726a5.png#averageHue=%2324282f&clientId=ua457a9f0-1db3-4&from=paste&height=384&id=BJG0H&originHeight=767&originWidth=583&originalType=binary&ratio=2&rotation=0&showTitle=false&size=60946&status=done&style=none&taskId=u4ad3cb35-d6ee-41e3-a001-74b97177470&title=&width=291.5)
```tsx
fontFamily: 'jiangchengludongyuan'
```
自定义字体需要在 `android/app/src/main/assets/fonts`下面放入字体，文件名就是字体名，并且需要重新运行项目。
### ImageBackground
```tsx
<ImageBackground
  style={styles.viewStyle}
  imageStyle={styles.imgStyle}
  source=fbg card}
  ref={viewRef}
  imageRef=fimgRef]
>
  <Text>子元素</Text>
</ImageBackground>
```
ImageBackground 由 Image 和 View 组件组合而成，所以它有如下特性：

- 它拥有 `style`、`imageStyle`
- 它拥有 `ref`、`imageRef`
- 它拥有 `source`
### TtextInput
 唯一且强大的输入组件
```tsx
<TextInput
  ref={input.ref}
  style={styles.input}
  autoFocus={true}
  blurOnSubmit={true} // 文本框会在提交的时候失焦
  caretHidden={false}
  defaultValue="默认内容"
  editable={true}
  keyboardType='default' // 键盘类型
  returnKeyType='default' // 确认键的类型
  maxLength={11} // 最长输入
  multiline={true} // 开启多行
  numberOfLines={2} // 显示的行数
  secureTextEntry={true} // 密码模式，与 multiline 不兼容

  // 回调事件
  onChange={(event) => {
    console.log(event.nativeEvent)
  }}
  onChangeText={(text) => {
    
  }}
  onFocus={handleFocus}
  onBlur={handleBlur}

  // 选择相关
  selection={{start: 0, end: 10}} // 选择的内容
  selectionColor='red'
  selectTextOnFocus={true} // 在聚焦时选中文字，注意 autoFocus 时不会触发
/>

// methods
input.current.focus()
input.current.blur()
```
### TouchableOpacity
最好用的点击组件
```tsx
<TouchableOpacity
  style={styles.button}
  activeOpacity={0.7} // 透明度
  onPress={() => {
    console.log('onPress...');
  }}
  onLongPress={() => {
    console.log('onLongPress...');
  }}
  delayLongPress={1000} // 长按时间
  onPressIn={() => {}}
  onPressOut={() => {}}>
  <Text>点击</Text>
</TouchableOpacity>
```
### ScrollView
**基础属性：**
```tsx
<ScrollView
  style={styles.root}
  contentContainerStyle={styles.containerStyle} // 容器样式
  keyboardDismissMode="on-drag" // 隐藏键盘
  keyboardShouldPersistTaps="handled" // never：第一次点击按钮关闭键盘，第二次触发事件; handled：点击按钮直接触发事件并且键盘不会消失，点击其他地方键盘消失
  overScrollMode="always" // 触顶/触底的效果
  scrollEnabled={true} // 是否允许滚动
  contentOffset={{y: 100}} // 初始滚动位置
  // methods
  onMomentumScrollBegin={() => {
    // 松手时才回调
    console.log('onMomentumScrollBegin...');
  }}
  onMomentumScrollEnd={() => {
    // 松手时才回调
    console.log('onMomentumScrollEnd...');
  }}
  onScroll={event => {
    console.log('Y: ', event.nativeEvent.contentOffset.y);
  }}
  scrollEventThrottle={16} // 回调频率，ios中不指定则只有放手才会触发 onScroll
  >
  <TextInput />
  {arr.map(item => (
    <Text key={item} style={styles.txt}>
      List item {item}
    </Text>
  ))}
</ScrollView>
```
**轮播：**
```tsx
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

export default function ScrollViewDemo() {
  const window = useWindowDimensions();
  return (
    <ScrollView style={styles.root} horizontal={true} pagingEnabled={true}>
      <View
        style={[styles.view, {width: window.width, backgroundColor: 'red'}]}
      />
      <View
        style={[styles.view, {width: window.width, backgroundColor: 'blue'}]}
      />
      <View
        style={[styles.view, {width: window.width, backgroundColor: 'yellow'}]}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 200,
  },
  view: {
    height: 200,
  },
});
```
**ref methods:**

- scrollTo()
- scrollToEnd()
### Flatlist
高性能列表组件
此组件由 ScrollView 组件封装而成，所以 ScrollView 的属性它也有
```tsx
import {StyleSheet, Text, FlatList, View} from 'react-native';
import React from 'react';

const data: number[] = [];
for (let i = 1; i < 20; i++) {
  data.push(i);
}

export default function FlatListDemo() {
  const ListHeader = (
    <View style={styles.header}>
      <Text style={styles.extraTxt}>Header</Text>
    </View>
  );
  const ListFooter = (
    <View style={[styles.header, styles.footer]}>
      <Text style={styles.extraTxt}>Footer</Text>
    </View>
  );
  const ListEmpty = (
    <View style={styles.empty}>
      <Text style={styles.extraTxt}>暂无数据哦~</Text>
    </View>
  );
  const renderItem = ({item}: any) => {
    return <Text style={styles.txt}>List item {item}</Text>;
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => `item-${index}`}
      style={styles.flatlist}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmpty}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={15} // 初始化item渲染的数量
      inverted={false} // 是否反向
      numColumns={1} // 多列布局，修改报错后需要 reload
      onViewableItemsChanged={({viewableItems}) => {
        // 返回在视图中的 item
        console.log(viewableItems);
      }}
    />
  );
}
```
**ref methods:**
```tsx
// 将 index 5滚动到顶部
flatListRef.current.scrollToIndex({
  index: 5,
  viewPosition: 0, // 滚动到视图的位置: 0-1
  animated: true
})

// 不推荐使用，性能不佳
flatListRef.current.scrollToItem({
  item: 5,
  viewPosition: 0,
  animated: true
})

// 滚动到指定位置
flatListRef.current.scrollToOffset({
  offset: 200
})

flatListRef.current.scrollToEnd()
```
### SectionList
多类型分组列表
```tsx
import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const sectionData = [
  {type: 'A', data: ['阿林', '阿强', '阿冬 ', '阿旺', '安可', '安庆']},
  {type: 'B', data: ['柏树', '贝贝', '柏志', '伯父', '爸爸', '北星']},
  {type: 'C', data: ['陈琳', '陈兵', '陈青青', '蔡小飞 ', '蔡小军']},
];

type sectionDataType = (typeof sectionData)[0];

export default function SectionListDemo() {
  const ListHeader = (
    <View style={styles.header}>
      <Text style={styles.extraTxt}>Header</Text>
    </View>
  );
  const ListFooter = (
    <View style={[styles.header, styles.footer]}>
      <Text style={styles.extraTxt}>Footer</Text>
    </View>
  );
  const ListEmpty = (
    <View style={styles.empty}>
      <Text style={styles.extraTxt}>暂无数据哦~</Text>
    </View>
  );
  const renderItem = ({item}: any) => {
    return <Text style={styles.txt}>List item {item}</Text>;
  };
  const renderSectionHeader = ({section}: {section: sectionDataType}) => {
    return <Text style={styles.sectionHeaderTxt}>{section.type}</Text>;
  };

  return (
    <SectionList
      ref={sectionListRef}
      sections={sectionData}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmpty}
      renderSectionHeader={renderSectionHeader} // 分组头部
      stickySectionHeadersEnabled={true} // 分组头部吸顶
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
  );
}
```
**ref methods:**
```tsx
// 滚动到第一组的第三个元素的位置
flatListRef.current.scrollToLocation({
  sectionIndex: 1,
  itemIndex: 3, // 需要注意的是 itemIndex 会将 section 也算作一个 index，所以从 1 开始
  viewPosition: 0 // 滚动到视图的位置: 0-1
})
```
### RefreshControl
```tsx
<SectionList
  sections={sectionData}
  renderItem={renderItem}
  ListHeaderComponent={ListHeader}
  ListFooterComponent={ListFooter}
  ListEmptyComponent={ListEmpty}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
  renderSectionHeader={renderSectionHeader} // 分组头部
  stickySectionHeadersEnabled={true} // 分组头部吸顶
  refreshControl={
    // 下拉刷新
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => {
        console.log('onRefresh...');
        setRefreshing(true);

        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }}
      />
  }
  onEndReached={() => {
    // 触底回调
    console.log('onEndReached...');
  }}
  onEndReachedThreshold={0.2} // 触底距离：0-1
  />
```
### Modal
```tsx
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SectionList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const sectionData = [
  {type: 'A', data: ['阿林', '阿强', '阿冬 ', '阿旺', '安可', '安庆']},
  {type: 'B', data: ['柏树', '贝贝', '柏志', '伯父', '爸爸', '北星']},
  {type: 'C', data: ['陈琳', '陈兵', '陈青青', '蔡小飞 ', '蔡小军']},
];

type sectionDataType = (typeof sectionData)[0];

export default function ModalDemo() {
  const [visible, setVisible] = useState(false);
  const ListHeader = (
    <View style={styles.header}>
      <Text style={styles.extraTxt}>Header</Text>
      <TouchableOpacity
        style={styles.closeBtn}
        activeOpacity={0.8}
        onPress={() => {
          setVisible(false);
        }}>
        <Text style={styles.closeTxt}>关</Text>
      </TouchableOpacity>
    </View>
  );
  const ListFooter = (
    <View style={[styles.header, styles.footer]}>
      <Text style={styles.extraTxt}>Footer</Text>
    </View>
  );
  const ListEmpty = (
    <View style={styles.empty}>
      <Text style={styles.extraTxt}>暂无数据哦~</Text>
    </View>
  );
  const renderItem = ({item}: any) => {
    return <Text style={styles.txt}>List item {item}</Text>;
  };
  const renderSectionHeader = ({section}: {section: sectionDataType}) => {
    return <Text style={styles.sectionHeaderTxt}>{section.type}</Text>;
  };

  return (
    <View style={styles.root}>
      <Button
        title="按钮"
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal
        visible={visible}
        transparent={true} // 是否显示底部
        statusBarTranslucent={true} // 状态栏半透明
        animationType="slide"
        // methods
        onRequestClose={() => {
          // 返回键
          setVisible(false);
        }}
        onShow={() => {
          console.log('onShow...');
        }}
        onDismiss={() => {
          // 官方bug，有时候不会回调
          console.log('onDismiss...');
        }}>
        <View style={styles.blank} />
        <View style={styles.content}>
          <SectionList
            sections={sectionData}
            renderItem={renderItem}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            ListEmptyComponent={ListEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderSectionHeader={renderSectionHeader} // 分组头部
            stickySectionHeadersEnabled={true} // 分组头部吸顶
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '90%',
    backgroundColor: '#ff0030',
  },
  sectionList: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 48,
    backgroundColor: '#00ff30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#ff0030',
  },
  sectionHeaderTxt: {
    width: '100%',
    height: 36,
    backgroundColor: '#dddddd',
    textAlignVertical: 'center',
    paddingLeft: 16,
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  empty: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#d0d0d0',
  },
  txt: {
    width: '100%',
    height: 56,
    fontSize: 26,
    color: 'black',
    textAlignVertical: 'center',
    paddingLeft: 16,
    backgroundColor: '#ebeced',
  },
  extraTxt: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 5,
    width: 24,
    height: 24,
  },
  closeTxt: {
    width: 24,
    height: 24,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  blank: {
    width: '100%',
    height: '10%',
    backgroundColor: '#00000050',
  },
});

```
这里需要注意的是，onDismiss 有bug，可以使用 `setVisible`代替。
### StatusBar
```tsx
<StatusBar
  barStyle={isDarkMode ? 'light-content' : 'dark-content'} // 内容颜色
  backgroundColor={backgroundStyle.backgroundColor} // 背景颜色
  translucent={false} // 沉浸式状态栏，应用是否在状态栏下绘制
  hidden={false} // 是否隐藏状态栏
/>
```
### Switch
```tsx
<Switch 
  value={value} 
  onValueChange={(value) => {}}
  disabled={false}
  trackColor={{true: 'red', false: 'gray'}}
  thumbColor={value ? 'yellow' : 'gray'}
>
</Switch>
```
## Api
### Style sheet
RN中的样式与 css 的不同点在于：

- 没有继承性，除了`text`组件
- 样式名采用 **camelcase **命名
- 所有尺寸都没有单位
- 有一些特殊样式：marginHorizontal（水平外边距）、marginVertical（垂直外边距）
```tsx
import {StyleSheet, Text, View} from 'react-native'

const Style = () => {
  return (
    // 使用数组时，后方样式覆盖前方样式
    <view style={[styles.red, styles.blue]}>
      Style
    </view>
  )
}

const styles = StyleSheet.Create({
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
})
```

- style属性可以是一个普通的 JavaScript 对象。
- 也可以传递一个数组，在数组中位置居后的样式对象比居前的优先级更高，这样你可以间接实现样式的继承。
#### transform
```tsx
const styles = {
  transform: [
    {translateX: 200},
    {translateY: 150},
    {scale: 1.5},
    // {scalex: 1.5},
    // {scaleY: 1.5}
    {rotatex: '45deg'},
    // {rotateY:45deg'}
    {rotatez:'45deg'},
    // {rotate:'45deg'}
  ]
}
```
#### methods
```tsx
const style1 = {
  fontSize: 18,
};

const style2 = {
  fontSize: 20,
  color: 'red',
};

// 组合样式
const composeStyle = StyleSheet.compose(style1, style2)
// [{"fontSize": 18}, {"color": "red", "fontSize": 20}]

// 平铺样式，相同的样式后方的覆盖前方
const flattenStyle = StyleSheet.flatten(style1, style2)
// {"color": "red", "fontSize": 20}

// 覆盖全屏的布局
StyleSheet.absoluteFill
// {"bottom": 0, "left": 0, "position": "absolute", "right": 0, "top": 0}

// 1px
StyleSheet.hairlineWidth
```
与使用数组类似，但是性能会更好。
### Alert 与 console
```tsx
 Alert.alert('标题', '描述', [
  {text: '取消', onPress: () => {}},
  {text: '确定', onPress: () => {}},
])
```
RN 中 console 也支持例如`debug`、`info`、`warn`、`error`。
### Platform
**平台属性：**
```json
{
  "OS": "android",
  "Version": 33,
  "__constants": {
    "Brand": "google",
    "Fingerprint": "google/sdk_gphone_x86_64/emu64xa:13/TE1A.220922.034/10940250:userdebug/dev-keys",
    "Manufacturer": "Google",
    "Model": "sdk_gphone_x86_64",
    "Release": "13",
    "Serial": "unknown",
    "ServerHost": "10.0.2.2:8081",
    "Version": 33,
    "isTesting": false,
    "reactNativeVersion": {
      "major": 0,
      "minor": 73,
      "patch": 0,
      "prerelease": null
    },
    "uiMode": "normal"
  },
  "constants": {
    "Brand": "google",
    "Fingerprint": "google/sdk_gphone_x86_64/emu64xa:13/TE1A.220922.034/10940250:userdebug/dev-keys",
    "Manufacturer": "Google",
    "Model": "sdk_gphone_x86_64",
    "Release": "13",
    "Serial": "unknown",
    "ServerHost": "10.0.2.2:8081",
    "Version": 33,
    "isTesting": false,
    "reactNativeVersion": {
      "major": 0,
      "minor": 73,
      "patch": 0,
      "prerelease": null
    },
    "uiMode": "normal"
  },
  "isDisableAnimations": false,
  "isTV": false,
  "isTesting": false,
  "select": "[Function select]" // 根据平台选择的方法
}
```
**平台选择：**
```tsx
const style = Platform.select({
  android: {
    marginTop: 20,
  },
  ios: {
    marginTop: 0,
  },
  default: {
    marginTop: 10,
  },
});
console.log(style); // {marginTop: 20}
```
同样也可以直接在 styles 中展开属性。
### Linking
```tsx
const url = 'http://www.baidu.com';
const canOpen = await Linking.canOpenURL(url);
if (canOpen) {
  Linking.openURL(url);
}

Linking.openSettings() // 跳转应用设置页面
Linking.getInitialURL() // 获取初始URL，如果是从其他应用跳过来
```
### PixelRatio
```tsx
PixelRatio.get() // 获取像素比例
PixelRatio.getFontScale() // 获取字体比例
PixelRatio.getPixelSizeForLayoutSize(200) // 根据逻辑像素获取真实像素
PixelRatio.roundToNearestPixel(32.1) // 在设置小数时可能会产生界面撕裂，使用这个 api 可以解决
```
### BackHandler
安卓返回键
```tsx
useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', backForAndroid);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', backForAndroid);
  };
}, []);

const backForAndroid = () => {
  console.log(111);
  return true; // true 拦截返回, false 不拦截
};

BackHandler.exitApp() // 退出app
```
很好用的第三方库
[@react-native-community/hooks](https://www.npmjs.com/package/@react-native-community/hooks)
```tsx
useBackHandler(() => {
  console.log(111);
  return true; // true 拦截返回, false 不拦截
})
```
这样就非常方便
### PermissionsAndroid
安卓权限
#### 注册权限
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704609770910-ad492147-f773-4ff8-acd5-a537e46b994c.png#averageHue=%23272b33&clientId=u65aa68b7-4e53-4&from=paste&height=657&id=ua7d27fa5&originHeight=1313&originWidth=2493&originalType=binary&ratio=2&rotation=0&showTitle=false&size=422920&status=done&style=none&taskId=u6f89f410-14b7-4230-8d32-44cb66d209e&title=&width=1246.5)
注册权限之后需要重启项目。
#### 使用权限
```tsx
PermissionsAndroid.PERMISSIONS // 所有权限

// 检查权限
const checkFlag = await PermissionsAndroid.check(
  'android.permission.CALL_PHONE',
);
if (checkFlag) { // 有权限则不再请求
  return;
}
// 请求权限
const permission = await PermissionsAndroid.request(
  'android.permission.CALL_PHONE',
);
if (permission === 'granted') {
  console.log('成功');
} else if (permission === 'denied') {
  console.log('用户拒绝');
} else {
  console.log('拒绝');
}

// 请求多个权限
const permissions = await PermissionsAndroid.requestMultiple([
  'android.permission.CALL_PHONE',
]);
if (
  permissions['android.permission.CALL_PHONE'] ===
  PermissionsAndroid.RESULTS.GRANTED
) {
  console.log('CALL_PHONE 权限已获取');
}
```
### Vibration
```xml
<uses-permission android:name="android.permission.VIBRATE" />
```
```tsx
Vibration.vibrate() // 默认400ms，Android 支持修改时间; IOS 永远 400ms
Vibration.vibrate([100, 500, 200, 500]) // 安卓间隔震动
Vibration.vibrate([100, 200, 300, 400]) // IOS 间隔震动
Vibration.vibrate([100, 200, 300, 400], true) // 根据间隔循环震动
Vibration.cancel() // 关闭震动
```
### Keyborad
```tsx
Keyboard.dismiss() // 隐藏键盘
```
## Hook
独属 react-native 的 hook
### useWindowDimensions
获取设备width和height值
```tsx
const window = useWindowDimensions()
console.log(...window)
```
这里需要注意的是，不能直接扩展出来，否则会报错。
### useColorScheme
获取显示模式
```tsx
const colorScheme = useColorScheme()
```
## 可能需要修改的文件
![5-3RN开发中常见的原生文件.mp4_20240102_161512.070.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/21870146/1704183484222-23c9a34d-9940-4387-92ba-8331a3d2efe3.jpeg#averageHue=%23f9f7fa&clientId=u412045e9-4bcd-4&from=paste&height=540&id=uff48dde2&originHeight=1080&originWidth=1920&originalType=binary&ratio=2&rotation=0&showTitle=false&size=147514&status=done&style=none&taskId=u43efb609-249b-4232-a37d-ac485d43c24&title=&width=960)
## ADB
```tsx
adb devices ## 查看设备列表
adb connect 127.0.0.1:7555 ## 连接设备，现在这个是木木模拟器的ip
adb disconnect 127.0.0.1:7555 ## 断联设备
adb kill-server ## 停止adb
adb start-server ## 启动adb
adb reverse tcp:8081 tcp:8081 ## 映射端口

## shell
adb shell ## 进入沙盒
## 传输文件
adb push C:/Users/jesse/Desktop/test.jpg sdcard/
  adb pull sdcard/test.jpg C:/Users/jesse/Desktop/
```
## 项目运行、调试与发布
### 运行

1. 初始化项目
```bash
npx react-native init AccountManage
```

2. 使用 Android Studio 打开其中的 android 目录，让它自动 build

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704784554442-a2fc7332-f3ab-46f5-9b5e-0db5bd082ce9.png#averageHue=%23ebeaea&clientId=u7b1c0b4b-6bac-4&from=paste&height=958&id=uaba369ef&originHeight=1915&originWidth=3199&originalType=binary&ratio=2&rotation=0&showTitle=false&size=355614&status=done&style=none&taskId=u036f30dd-bd1e-40fa-906c-9897f154487&title=&width=1599.5)

3. 随后关闭 Android Studio，在项目根目录运行以下命令启动：
```bash
yarn android
```
### 调试

1. 在`Metro`控制台按下 `D`键
2. 随后在：`edge://inspect/#devices`，中选中 Hermes React Native

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704785239085-24b0a4b1-2c06-4862-9751-290acd4de519.png#averageHue=%23fbfafa&clientId=u7b1c0b4b-6bac-4&from=paste&height=401&id=u95ecc55d&originHeight=1455&originWidth=1695&originalType=binary&ratio=2&rotation=0&showTitle=false&size=175186&status=done&style=none&taskId=u908b20e6-e6d7-4a1f-b78b-5b9f8d0e7af&title=&width=467)
### 发布
#### 更改项目名与图标
**更改项目名：**
`android/app/src/main/res/values/strings.xml`
```xml
<resources>
  <string name="app_name">账号管理</string>
</resources>
```
**修改图标：**
`android/app/src/main/res/mipmap-*`
这里的内容就是图标，其中
#### 打包

1. 选择 Generate Signed Bundle / APK

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704807849864-5142dbd1-e47a-4a19-b223-839f8c067d4b.png#averageHue=%23ebe9e8&clientId=u233ed6a1-d44a-4&from=paste&height=411&id=u3909d389&originHeight=821&originWidth=1447&originalType=binary&ratio=2&rotation=0&showTitle=false&size=91674&status=done&style=none&taskId=u3d59eed3-4c28-42ea-b14d-d32cf77ac43&title=&width=723.5)

2. 选择 APK

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704807905921-4c49bd08-58b8-4886-a787-465b2719ad01.png#averageHue=%23ececeb&clientId=u233ed6a1-d44a-4&from=paste&height=410&id=ucf69334a&originHeight=819&originWidth=985&originalType=binary&ratio=2&rotation=0&showTitle=false&size=41173&status=done&style=none&taskId=uc5143b25-ee37-46a7-908e-10fa093f96f&title=&width=492.5)

3. 生成 Key store

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704807938378-2d31a62f-882b-4959-8fe3-34ce2dfaa4a5.png#averageHue=%23eeeded&clientId=u233ed6a1-d44a-4&from=paste&height=410&id=u886794e7&originHeight=819&originWidth=985&originalType=binary&ratio=2&rotation=0&showTitle=false&size=40142&status=done&style=none&taskId=u23a0516f-fa77-4fbd-9a2e-2d30127894d&title=&width=492.5)

4. 选择路径

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704807979780-d9d7cc82-d7df-498e-add1-d423a37a6e10.png#averageHue=%23efefee&clientId=u233ed6a1-d44a-4&from=paste&height=535&id=ub86e7b32&originHeight=1069&originWidth=1023&originalType=binary&ratio=2&rotation=0&showTitle=false&size=47949&status=done&style=none&taskId=u62b63b53-fc5e-4933-9b98-efb6b84cdf7&title=&width=511.5)

5. 创建 keystore 文件

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704808183944-f682eff8-a3d4-40f3-9c06-95b13de13d59.png#averageHue=%23f3f2f2&clientId=u233ed6a1-d44a-4&from=paste&height=546&id=u44e038d0&originHeight=1091&originWidth=871&originalType=binary&ratio=2&rotation=0&showTitle=false&size=60995&status=done&style=none&taskId=ua39cc852-0ce3-4a45-afe1-fcc1c928653&title=&width=435.5)
放在原生工程：`项目目录\android`目录下

6. 填写内容

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704808298121-36cb964b-f42c-44e5-af10-b55be7db2095.png#averageHue=%23eeeeee&clientId=u233ed6a1-d44a-4&from=paste&height=535&id=iv3Ey&originHeight=1069&originWidth=1023&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58724&status=done&style=none&taskId=u7c45e18e-3ffc-4bc4-b982-1ebcce15b4f&title=&width=511.5)
密码可以都是 123456，反正随便填

7. 选择 keystore 类型，生成文件

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1704808407217-db7611ea-5245-46f3-b8e2-e00b5756c12a.png#averageHue=%23f3f3f3&clientId=u233ed6a1-d44a-4&from=paste&height=410&id=u81a2568b&originHeight=819&originWidth=985&originalType=binary&ratio=2&rotation=0&showTitle=false&size=31461&status=done&style=none&taskId=u0c4167bc-1659-4dd4-8c96-47c079b4ffb&title=&width=492.5)
旧版生成的是 keystore 文件，新版的是 jks 文件。
我们可以看到在 `android/app/release/` 已经有新生成的apk了。
