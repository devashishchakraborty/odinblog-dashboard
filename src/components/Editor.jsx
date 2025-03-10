import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  Separator,
  BlockTypeSelect,
  CodeToggle,
  ListsToggle,
  linkDialogPlugin,
  linkPlugin,
  CreateLink,
  tablePlugin,
  InsertTable,
  imagePlugin,
  InsertImage,
  InsertThematicBreak,
  KitchenSinkToolbar
} from "@mdxeditor/editor";
import "../styles/Editor.css";

function Editor() {
  return (
    <div className="editorWrapper">
      <form action="#" className="pico">
        <input type="text" name="title" id="title" placeholder="Title" />
      </form>
      <MDXEditor
        className="mdxEditor"
        markdown=""
        placeholder="Write your article here..."
        plugins={[
          linkPlugin(),
          imagePlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          toolbarPlugin({
            toolbarClassName: "my-classname",
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <CreateLink />
                <InsertImage />
                <Separator />
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

export default Editor;
