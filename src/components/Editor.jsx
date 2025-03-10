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
} from "@mdxeditor/editor";

function Editor() {
  return (
    <div className="editorWrapper">
      <MDXEditor
        className="mdxEditor"
        markdown="Hello world"
        plugins={[
          linkPlugin(),
          linkDialogPlugin(),
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
                <CreateLink />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

export default Editor;
