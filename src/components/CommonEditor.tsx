/*
 * @Author       : topfivegao
 * @Date         : 2023-01-29 20:51:54
 * @FilePath     : /backend/src/components/CommonEditor.tsx
 * @LastEditTime : 2023-02-02 00:24:35
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import LeanCloudSDK from '@/utils/init-leancloud-sdk.js'


type InsertFnType = (url: string, alt: string, href: string) => void

const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

function MyEditor(props: any) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法


    // 编辑器内容
    const [html, setHtml] = useState('')


    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
        onBlur: (editor: IDomEditor) => {
            const h = editor.getHtml()
            props.onChange(h)
        },
        MENU_CONF: {
            uploadImage: {
                // 自定义上传
                async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
                    console.log(file);
                    getBase64(file, base64 => {
                        const fn = file.name
                        // 调用 sdk 构建文件
                        const f = new LeanCloudSDK.File(fn, { base64 });
                        // 保存文件到云端
                        f.save().then((fi: any) => {
                          const furl = fi.attributes.url
                          console.log(fi);
                          insertFn(furl, '编辑器上传的图片', furl)
                  
                        }, (error: any) => {
                          // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
                          console.log(`文件保存失败：${error}`);
                        });
                      })

                }

            },
        }
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={
                        (editor: IDomEditor) => {
                            setHtml(editor.getHtml())
                        }
                    }
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor