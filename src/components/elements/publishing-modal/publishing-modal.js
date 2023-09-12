import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Modal, Stack, InputLabel, OutlinedInput, FormControl, Select, MenuItem, Checkbox, ListItemText } from '@mui/material'
import { __CONTENT_TYPES, __MAIN_CATEGORIES } from '../../../DB'
import './style.scss'


const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function PublishingModal({
    title,
    isOpen,
    close,
    onPublishClick
}) {

    const matches = useMediaQuery('(min-width:900px)');
    const { t } = useTranslation();
    const [contentType, setContentType] = useState([]);
    const [contentTopic, setContentTopic] = useState([]);

    const handleChangeForType = (event) => {
        const {
            target: { value },
        } = event;
        setContentType(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeForTopic = (event) => {
        const {
            target: { value },
        } = event;
        setContentTopic(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return <Modal
        open={isOpen}
    >
        <main id="create-blog-modal">
            <h3>{title}</h3>
            <Stack flexDirection="column" spacing={2}>
                <FormControl
                    sx={{ width: !matches ? "70vw" : 400 }}
                >
                    <InputLabel
                        id="outlined-textarea"
                        size="small"
                    >{t("create-pages.content-type")}</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={contentType}
                        onChange={handleChangeForType}
                        input={<OutlinedInput label={t("create-pages.content-type")} />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        error={!(contentType[0])}
                    >
                        {__CONTENT_TYPES.map((item) => (
                            <MenuItem key={item.title} value={item.title}>
                                <Checkbox checked={contentType.indexOf(item.title) > -1} />
                                <ListItemText primary={t(`content-types.${item.title}`)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{ width: !matches ? "70vw" : 400 }}
                >
                    <InputLabel
                        id="outlined-textarea"
                        size="small"
                    >{t("create-pages.content-type")}</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={contentTopic}
                        onChange={handleChangeForTopic}
                        input={<OutlinedInput label={t("create-pages.content-type")} />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        error={contentTopic[0] ? false : true}
                    >
                        {__MAIN_CATEGORIES.map((item) => (
                            <MenuItem key={item.title} value={item.title}>
                                <Checkbox checked={contentTopic.indexOf(item.title) > -1} />
                                <ListItemText primary={t(`main-categories.${item.title}`)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <div className="create-blog-modal-div">
                <button
                    disabled={!(contentType.length && contentTopic.length)}
                    onClick={() => {
                        onPublishClick(contentType, contentTopic);
                        setContentType([])
                        setContentTopic([])
                    }}>{t("create-pages.publish")}</button>
                <button onClick={close}>{t("create-pages.close")}</button>
            </div>
        </main>
    </Modal>
}
