// Types
import * as actionType from './types';
import * as blockType from '../components/Blocks/types';

// Libs
import { v4 as uuid4 } from 'uuid';

export default class ActionManager {
  static state = {
    sideBarBlocks: [
      {
        type: blockType.MOTION_MOVE,
        value: "10"
      },
      {
        type: blockType.EVENT_START_CLICK
      },
      {
        type: blockType.LOOKS_SAY,
        value: "Hello!"
      }
    ],
    scripts: {},
  }
  static activeBlock = null;
  static parentBlock = null;
  static currentlyEditingElement = null;
  static dispatch = null;
  static mouse = { clientX: null, clientY: null };
  static blocks = {};
  static blockStack = [];
  static activeSprite = null;
  static sprites = {};

  static reducer = (prevState, action) => {
    switch (action.type) {
      case actionType.MOUSE_DOWN:
        return {
          ...this.state,
        }
      case actionType.MOUSE_MOTION_MOVE:
        break;
      case actionType.MOUSE_UP:
        return {
          ...this.state,
        }
      default:
    }
  }

  static setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  static mouseDown = () => {
    if (this.currentlyEditingElement) {
      document.querySelector('.Editor').contentEditable = "false";
      this.currentlyEditingElement.style.userSelect = 'none';
      const id = this.currentlyEditingElement.parentNode.parentNode.id;
      this.blocks[id].value = this.currentlyEditingElement.textContent;
      this.dispatch({ type: actionType.MOUSE_DOWN });
      this.currentlyEditingElement = null;
    }
  }

  static mouseMove = ({ clientX, clientY }) => {
    this.mouse.clientX = clientX;
    this.mouse.clientY = clientY;
    if (this.activeBlock) {
      this.activeBlock.setAttribute(
        'transform',
        `translate(${clientX - this.activeBlock.offsetX},${clientY - this.activeBlock.offsetY})`
      );
    }
  }

  static mouseUp = () => {
    if (this.activeBlock) {
      this.blocks[this.activeBlock.id].newlyCreated = false;
      this.activeBlock.removeAttribute('style');
      const activeBlock = this.blocks[this.activeBlock.id];
      let partOfScript = false;
      if (activeBlock.prev) {
        partOfScript = true;
      }
      if (this.parentBlock) {
        const parentBlock = this.blocks[this.parentBlock.id];
        if (partOfScript) {
          activeBlock.prev.next = null;
          activeBlock.prev = null;
        }

        let lastBlock = activeBlock;
        while (lastBlock.next !== null && lastBlock.next !== undefined) {
          lastBlock = lastBlock.next;
        }

        if (parentBlock.next) {
          lastBlock.next = parentBlock.next;
          lastBlock.next.prev = lastBlock;
        } else {
          lastBlock.next = null;
        }
        parentBlock.next = activeBlock;
        parentBlock.next.prev = parentBlock;

        activeBlock.transform = { x: 0, y: 35 };
        if (!partOfScript) {
          delete this.state.scripts[activeBlock.scriptId];
        }
        activeBlock.scriptId = parentBlock.scriptId;
        this.parentBlock = null;
      } else if (activeBlock.prev) {
        activeBlock.prev.next = null;
        activeBlock.prev = null;
        activeBlock.transform = { x: this.activeBlock.getBoundingClientRect().x, y: this.activeBlock.getBoundingClientRect().y };
        const id = uuid4();
        activeBlock.scriptId = id;
        let tempBlock = activeBlock;
        while (tempBlock.next) {
          tempBlock = tempBlock.next;
          tempBlock.scriptId = id;
        }
        this.state.scripts[id] = {
          blocks: activeBlock
        };
      } else {
        activeBlock.transform = { x: this.activeBlock.getBoundingClientRect().x, y: this.activeBlock.getBoundingClientRect().y };
      }
      this.activeBlock = null;
      this.dispatch({ type: actionType.MOUSE_UP });
    }
  }

  static Block = {
    createBlock: ({ type, transform }) => {
      const id = uuid4();
      const block = {
        id: id,
        type: type,
        transform: transform,
        newlyCreated: true,
        sprite: this.activeSprite.id
      };
      if (type === blockType.MOTION_MOVE) {
        block.value = 10;
      } else if (type === blockType.LOOKS_SAY) {
        block.value = "Hello!";
      }
      this.blocks[id] = block;
      return block;
    },

    mouseDown: ({ element, clientX, clientY, sidebar, type }) => {
      if (sidebar) {
        const id = uuid4();
        const block = this.Block.createBlock({
          type,
          transform: { x: clientX - 20, y: clientY - 10 }
        });

        const script = {
          blocks: block
        }
        this.state.scripts[id] = script;
        block.scriptId = id;
        this.dispatch({ type: actionType.MOUSE_DOWN });
        return;
      }
      element.setAttribute('style', 'pointer-events: none');
      element.offsetX = clientX - element.transform.baseVal.getItem(0).matrix.e;
      element.offsetY = clientY - element.transform.baseVal.getItem(0).matrix.f;
      this.activeBlock = element;
    },

    mouseEnter: ({ element, clientX }) => {
      this.blockStack.push(element);
      if (this.activeBlock && clientX >= 200) {
        this.parentBlock = this.blockStack[this.blockStack.length - 1];
      }
    },

    mouseLeave: ({ clientX }) => {
      this.blockStack.pop();
      if (this.activeBlock && clientX >= 200) {
        if (this.blockStack.length > 0) {
          this.parentBlock = this.blockStack[this.blockStack.length - 1];
        } else {
          this.parentBlock = null;
        }
      }
    }
  }

  static Text = {
    mouseDown: ({ element }) => {
      document.querySelector('.Editor').contentEditable = "true";
      element.style.userSelect = 'text';
      this.currentlyEditingElement = element;
    }
  }

  static Controller = {
    startClick: () => {
      Object.keys(this.state.scripts).forEach(scriptId => {
        if (this.state.scripts[scriptId].blocks.type === blockType.EVENT_START_CLICK) {
          const blocks = this.state.scripts[scriptId].blocks;
          const sprite = this.sprites[blocks.sprite];
          let currentBlock = blocks;
          while (currentBlock) {
            switch (currentBlock.type) {
              case blockType.MOTION_MOVE:
                const currentTransform = { x: sprite.transform.baseVal.getItem(0).matrix.e, y: sprite.transform.baseVal.getItem(0).matrix.f };
                currentTransform.x += parseInt(currentBlock.value);
                sprite.setAttribute('transform', `translate(${currentTransform.x}, ${currentTransform.y})`);
                break;
              case blockType.LOOKS_SAY:
                const messageElement = document.getElementById(`message-${sprite.id}`);
                messageElement.textContent = currentBlock.value;
                messageElement.setAttribute('visibility', 'visible');
                break;
              default:
                break;
            }
            currentBlock = currentBlock.next;
          }
        }
      })
    },

    resetClick: () => {
      this.sprites['1'].setAttribute('transform', 'translate(0, 20)');
      this.sprites['2'].setAttribute('transform', 'translate(0, 200)');
      document.getElementById('message-1').setAttribute('visibility', 'hidden');
      document.getElementById('message-2').setAttribute('visibility', 'hidden');
    }
  }

  static Sprite = {
    setActiveSprite: (sprite) => {
      this.activeSprite = sprite;
      this.dispatch({ type: actionType.MOUSE_DOWN });
    }
  }
};