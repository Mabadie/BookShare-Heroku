# Generated by Django 2.1 on 2018-08-23 08:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_auto_20180823_0830'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='owner_id',
            new_name='owner',
        ),
    ]
