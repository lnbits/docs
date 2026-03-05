import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import ExtensionCard from './components/ExtensionCard.vue'
import ExtensionGrid from './components/ExtensionGrid.vue'
import APIPlayground from './components/APIPlayground.vue'
import EndpointBlock from './components/EndpointBlock.vue'
import SchemaViewer from './components/SchemaViewer.vue'
import FundingSourceTable from './components/FundingSourceTable.vue'
import PageToolbar from './components/PageToolbar.vue'
import HomePage from './components/HomePage.vue'
import ExtensionHeader from './components/ExtensionHeader.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(PageToolbar),
    })
  },
  enhanceApp({ app }) {
    app.component('ExtensionCard', ExtensionCard)
    app.component('ExtensionGrid', ExtensionGrid)
    app.component('APIPlayground', APIPlayground)
    app.component('EndpointBlock', EndpointBlock)
    app.component('SchemaViewer', SchemaViewer)
    app.component('FundingSourceTable', FundingSourceTable)
    app.component('HomePage', HomePage)
    app.component('ExtensionHeader', ExtensionHeader)
  },
}
