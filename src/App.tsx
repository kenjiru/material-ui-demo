import * as _ from "lodash";
import * as React from "react";
import {ReactElement} from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {AppBar, Drawer, List, ListItem, Subheader, Dialog, FlatButton} from "material-ui";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from "material-ui/Table"
import FileFolder from "material-ui/svg-icons/file/folder";

import "material-design-icons/iconfont/material-icons.css";
import "./App.less";

injectTapEventPlugin();

class App extends React.Component<IAppProps, IAppState> {
    private folders: string[] = ["Hardware", "Work", "Books"];

    private notes: INoteModel[] = [{
        name: "Network configuration",
        lastChanged: new Date()
    }, {
        name: "Application passwords",
        lastChanged: new Date()
    }, {
        name: "Deployment process",
        lastChanged: new Date()
    }, {
        name: "Code guidelines",
        lastChanged: new Date()
    }];

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isDrawerVisible: false,
            isNoteDialogVisible: false,
            selectedFolder: 0
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title={this.getSelectedFolder()} onLeftIconButtonTouchTap={this.handleToggleDrawer}/>
                    <Drawer docked={false} open={this.state.isDrawerVisible}
                            onRequestChange={(isDrawerVisible) => this.setState({isDrawerVisible})}>
                        <List>
                            <Subheader>Folders</Subheader>
                            {this.renderFolders()}
                        </List>
                    </Drawer>
                    {this.renderNotesTable()}
                    {this.renderNoteDialog()}
                </div>
            </MuiThemeProvider>
        );
    }

    private renderNoteDialog(): ReactElement<any> {
        let actions: ReactElement<any>[] = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleNoteDialogClose}/>,
        ];

        return (
            <Dialog title={this.getSelectedNote()} actions={actions} modal={false}
                    open={this.state.isNoteDialogVisible}
                    onRequestClose={this.handleNoteDialogClose}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ligula in nunc
                tincidunt maximus. Phasellus laoreet interdum erat quis aliquet. Vestibulum elementum ante
                sapien, eu venenatis sapien pulvinar in. Aliquam finibus egestas tortor, at auctor leo
                laoreet ullamcorper. Aenean erat justo, vehicula convallis sem ut, ultrices lobortis
                lectus. Sed eu mi maximus, finibus lectus ut, vulputate urna. Vivamus sollicitudin
                lobortis dictum.</p>
            </Dialog>
        );
    }

    private renderFolders(): ReactElement<any>[] {
        return _.map(this.folders, (folderName: string, index: number): ReactElement<any> =>
            <ListItem key={index + folderName} leftIcon={<FileFolder />}
                      primaryText={folderName}
                      onClick={() => this.handleFolderClicked(index)}/>
        );
    }

    private renderNotesTable(): ReactElement<any> {
        return (
            <Table onCellClick={this.handleTableClick}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Last Changed</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.renderNotesRows()}
                </TableBody>
            </Table>
        );
    }

    private renderNotesRows(): ReactElement<any>[] {
        return _.map(this.notes, (note: INoteModel, i: number) =>
            <TableRow key={i}>
                <TableRowColumn>{note.name}</TableRowColumn>
                <TableRowColumn>{note.lastChanged.toString()}</TableRowColumn>
            </TableRow>
        );
    }

    handleToggleDrawer = () => {
        this.setState({
            isDrawerVisible: !this.state.isDrawerVisible
        });
    };

    handleFolderClicked = (selectedFolder) => {
        this.setState({
            selectedFolder,
            isDrawerVisible: false
        });
    };

    handleTableClick = (selectedNote: number, columnId: number) => {
        this.setState({
            selectedNote,
            isNoteDialogVisible: true
        })
    };

    handleNoteDialogClose = () => {
        this.setState({
            isNoteDialogVisible: false
        });
    };

    private getSelectedFolder(): string {
        if (_.isNil(this.state.selectedFolder)) {
            return "No folder selected!";
        }

        return this.folders[this.state.selectedFolder];
    }

    private getSelectedNote(): string {
        if (_.isNil(this.state.selectedNote)) {
            return "No note selected!";
        }

        return this.notes[this.state.selectedNote].name;
    }
}

interface INoteModel {
    name: string;
    lastChanged: Date;
}

interface IAppProps {
}

interface IAppState {
    isDrawerVisible?: boolean;
    isNoteDialogVisible?: boolean;
    selectedNote?: number;
    selectedFolder?: number;
    clickedNote?: number;
}

ReactDOM.render(<App/>, document.body);
