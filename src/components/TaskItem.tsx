import React, { useEffect, useRef, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from "./TasksList";

interface ITaskItem {
    task: Task
    toggleTaskDone: (id: number) => void
    removeTask: (id: number) => void
    editTask: (id: number, title: string) => void
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: ITaskItem) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskText, setTaskText] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setIsEditing(false);
        setTaskText(task.title);
    }

    function handleSubmitEditing() {
        editTask(task.id, taskText);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${task.id}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${task.id}`}
                        //TODO - use style prop 
                        style={[
                            styles.taskMarker,
                            task.done && styles.taskMarkerDone
                        ]}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={taskText}
                        editable={isEditing}
                        onChangeText={setTaskText}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>

            </View>
            <View style={styles.iconsContainer}>
                {
                    isEditing ? (
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                            style={{paddingHorizontal: 10}}
                        >
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                onPress={handleStartEditing}
                                style={{paddingHorizontal: 10}}
                            >
                                <Image source={editIcon}/>
                            </TouchableOpacity>
                        )

                }
                <View 
                    style={styles.iconsDivider}>
                </View>
                <TouchableOpacity
                    testID={`trash-${task.id}`}
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#b2b2b2',
    },
})