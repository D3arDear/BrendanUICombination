---
title:Tabs
---

# 标签

<ClientOnly>
<tabs-demo1></tabs-demo1>
</ClientOnly>

```html
<!-- ... -->
<z-tabs :selected="selected">
	<z-tabs-head>
		<z-tabs-item name="1">1</z-tabs-item>
		<z-tabs-item name="2">2</z-tabs-item>
	</z-tabs-head>
	<z-tabs-body>
		<z-tabs-pane name="1">content 1</z-tabs-pane>
		<z-tabs-pane name="2">content 2</z-tabs-pane>
	</z-tabs-body>
</z-tabs>
<!-- ... -->
<script>
	data(){
	    return {
	      selected: "1"
	    };
	}
</script>
```
