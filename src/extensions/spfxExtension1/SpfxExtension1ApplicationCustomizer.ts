import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import styles from './AppCustomizer.module.scss';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as strings from 'SpfxExtension1ApplicationCustomizerStrings';
const LOG_SOURCE: string = 'SpfxExtension1ApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpfxExtension1ApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpfxExtension1ApplicationCustomizer
  extends BaseApplicationCustomizer<ISpfxExtension1ApplicationCustomizerProperties> {

  private _topPlaceholder:PlaceholderContent|undefined;
  private _bottomPlaceholder:PlaceholderContent|undefined;
  
    @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this,this._renderPlaceHolders);

    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders():void{
    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    if(!this._bottomPlaceholder){
      this._bottomPlaceholder=this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,{onDispose:this._onDispose}
      );

      if(!this._bottomPlaceholder){
        console.error('the expected placeholder bottom was not found');
        return;
      }

      if(this._bottomPlaceholder.domElement){
        this._bottomPlaceholder.domElement.innerHTML=`
        <div class="${styles.app}">
          <div class="${styles.bottom}">
              <ul>
                <li><a traget="_blank" href="#">Our Company</a></li>
                <li><a traget="_blank" href="#">Our News</a></li>
                <li><a traget="_blank" href="#">ESOP</a></li>
              </ul>
              <ul>
                <li><a traget="_blank" href="#">News</a></li>
                <li><a traget="_blank" href="#">Hot Projects</a></li>
                <li><a traget="_blank" href="#">Calendar</a></li>
              </ul>
              <ul>
                <li><a traget="_blank" href="#">Forms</a></li>
                <li><a traget="_blank" href="#">Bulletin</a></li>
              </ul>
          </div>
        </div>
        `;
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
