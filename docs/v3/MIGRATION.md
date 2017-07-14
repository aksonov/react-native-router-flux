# Migrating from 2.x

## Breaking changes comparing with 2.x version:
- React Native 0.26 is required
- `Router` is root container now and should not be nested. For nested scenes you should use `Scene` element
- `Route` became `Scene`, now unique `key` attribute is required for each scene (it was `name` attribute before)
- Define all your scenes on top-level, not within `Router` as before (see Example)
- No `Schema` element is supported for now (for simplicity), maybe later it could be added
- No ActionSheet support
- Custom scene renderers are used instead of 'custom' types (like 'modal'), so 'modal' scenes are pushed as usual, but custom renderer will render them as popup. No `dismiss`, just usual `pop` to close such popups.
- No old navigator.sceneConfig support (instead the component uses React Native NavigationAnimatedView for better transitions)
- No onPush/onPop/etc handlers because they are not needed now. If navigation state is changed, container will be re-rendered with changed navigationState property, see `Modal` as Example.
- No header/footer properties are supported for Scene currently - you may include them into Scene component.
