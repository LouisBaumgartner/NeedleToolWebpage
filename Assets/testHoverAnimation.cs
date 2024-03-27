using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class testHoverAnimation : MonoBehaviour
{
    [SerializeField] private Animator _animator;
    private bool isHovering = false;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            isHovering = !isHovering;
        }
        
        if (isHovering)
        {
            _animator.SetBool("Hover", true);
                
        }
        else
        {
            _animator.SetBool("Hover", false);
        }
    }
}
